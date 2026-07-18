from datetime import datetime, timedelta

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction

from .models import Booking, BarberBlock
from barbers.models import Barber
from services.models import Service
from core.models import BusinessHours


# ---------- Helper ----------

def time_range(start, end, step_minutes):

    start_time = datetime.strptime(start, "%H:%M")
    end_time = datetime.strptime(end, "%H:%M")

    times = []

    while start_time < end_time:
        times.append(start_time.time())
        start_time += timedelta(minutes=step_minutes)

    return times


# ---------- Available Slots ----------

@api_view(["GET"])
def available_slots(request):

    barber_id = request.GET.get("barber")
    date = request.GET.get("date")
    service_id = request.GET.get("service")

    if not barber_id or not date or not service_id:
        return Response({"error": "barber, date, service required"}, status=400)

    try:
        barber = Barber.objects.get(id=barber_id)
        service = Service.objects.get(id=service_id)
    except:
        return Response({"error": "invalid barber or service"}, status=400)

    date_obj = datetime.strptime(date, "%Y-%m-%d").date()

    weekday = date_obj.weekday()

    hours = BusinessHours.objects.get(day_of_week=weekday)

    if hours.is_closed:
        return Response([])

    duration = service.duration_minutes

    possible_times = time_range(
        hours.open_time.strftime("%H:%M"),
        hours.close_time.strftime("%H:%M"),
        30
    )

    bookings = Booking.objects.filter(
        barber=barber,
        date=date_obj,
        status="booked"
    )

    blocks = BarberBlock.objects.filter(
        barber=barber,
        date=date_obj
    )

    available = []

    for start in possible_times:

        start_dt = datetime.combine(date_obj, start)
        end_dt = start_dt + timedelta(minutes=duration)

        end_time = end_dt.time()

        if end_time > hours.close_time:
            continue

        conflict = False

        # check booking conflict
        for booking in bookings:

            if not (
                end_time <= booking.start_time
                or start >= booking.end_time
            ):
                conflict = True
                break

        # check block conflict
        for block in blocks:

            if not (
                end_time <= block.start_time
                or start >= block.end_time
            ):
                conflict = True
                break

        if not conflict:
            available.append(start.strftime("%H:%M"))

    return Response(available)


# ---------- Create Booking ----------

@api_view(["POST"])
def create_booking(request):

    barber_id = request.data.get("barber")
    service_id = request.data.get("service")
    date = request.data.get("date")
    start_time = request.data.get("start_time")

    customer_name = request.data.get("customer_name")
    customer_phone = request.data.get("customer_phone")

    try:
        barber = Barber.objects.get(id=barber_id)
        service = Service.objects.get(id=service_id)
    except:
        return Response({"error": "invalid barber or service"}, status=400)

    start = datetime.strptime(start_time, "%H:%M").time()

    duration = service.duration_minutes

    date_obj = datetime.strptime(date, "%Y-%m-%d").date()

    start_dt = datetime.combine(date_obj, start)
    end_dt = start_dt + timedelta(minutes=duration)

    end = end_dt.time()

    # check barber block
    blocked = BarberBlock.objects.filter(
        barber=barber,
        date=date_obj,
        start_time__lt=end,
        end_time__gt=start
    ).exists()

    if blocked:
        return Response(
            {"error": "time blocked by barber"},
            status=400
        )

    with transaction.atomic():

        conflict = Booking.objects.select_for_update().filter(
            barber=barber,
            date=date_obj,
            start_time__lt=end,
            end_time__gt=start,
            status="booked"
        ).exists()

        if conflict:
            return Response(
                {"error": "timeslot already booked"},
                status=400
            )

        booking = Booking.objects.create(
            barber=barber,
            service=service,
            date=date_obj,
            start_time=start,
            end_time=end,
            customer_name=customer_name,
            customer_phone=customer_phone,
            status="booked"
        )

    return Response({"booking_id": booking.id})


# ---------- Cancel Booking ----------

@api_view(["POST"])
def cancel_booking(request, booking_id):

    try:
        booking = Booking.objects.get(id=booking_id)
    except Booking.DoesNotExist:
        return Response({"error": "booking not found"}, status=404)

    booking.status = "cancelled"
    booking.save(update_fields=["status"])

    return Response({"message": "booking cancelled"})


# ---------- Block Time ----------

@api_view(["POST"])
def block_time(request):

    barber_id = request.data.get("barber")
    date = request.data.get("date")
    start_time = request.data.get("start_time")
    end_time = request.data.get("end_time")
    reason = request.data.get("reason")

    try:
        barber = Barber.objects.get(id=barber_id)
    except Barber.DoesNotExist:
        return Response({"error": "barber not found"}, status=404)

    # check conflict with bookings
    conflict = Booking.objects.filter(
        barber=barber,
        date= date,
        start_time__lt=end_time,
        end_time__gt=start_time,
        status="booked"
    ).exists()

    if conflict:
        return Response({"error": "booking exists in this time"}, status=400)

    block = BarberBlock.objects.create(
        barber=barber,
        date=date,
        start_time=start_time,
        end_time=end_time,
        reason=reason
    )

    return Response({
        "message": "time blocked",
        "block_id": block.id
    })


# ---------- Calendar ----------

@api_view(["GET"])
def calendar_view(request):

    barber_id = request.GET.get("barber")
    date = request.GET.get("date")

    if not barber_id or not date:
        return Response({"error": "barber and date required"}, status=400)

    barber = Barber.objects.get(id=barber_id)

    date_obj = datetime.strptime(date, "%Y-%m-%d").date()

    weekday = date_obj.weekday()

    hours = BusinessHours.objects.get(day_of_week=weekday)

    if hours.is_closed:
        return Response([])

    start = datetime.combine(date_obj, hours.open_time)
    end = datetime.combine(date_obj, hours.close_time)

    slots = []

    current = start

    while current < end:

        slot_status = "available"
        extra = {}

        time = current.time()

        booking = Booking.objects.filter(
            barber=barber,
            date=date_obj,
            start_time=time,
            status="booked"
        ).select_related("service").first()

        if booking:
            slot_status = "booked"
            extra = {
                "booking_id": booking.id,
                "customer": booking.customer_name,
                "phone": booking.customer_phone,
                "service": booking.service.name,
                "duration": booking.service.duration_minutes
            }

        block = BarberBlock.objects.filter(
            barber=barber,
            date=date_obj,
            start_time__lte=time,
            end_time__gt=time
        ).first()

        if block:
            slot_status = "blocked"
            extra["reason"] = block.reason

        slots.append({
            "time": time.strftime("%H:%M"),
            "status": slot_status,
            **extra
        })

        current += timedelta(minutes=30)

    return Response(slots)


@api_view(["GET"])
def my_bookings(request):

    phone = request.GET.get("phone")

    if not phone:
        return Response({"error": "phone required"}, status=400)

    bookings = Booking.objects.filter(
        customer_phone=phone
    ).order_by("-date", "-start_time")

    data = []

    for b in bookings:
        data.append({
            "id": b.id,
            "barber": b.barber.name,
            "service": b.service.name,
            "date": b.date,
            "start_time": b.start_time,
            "end_time": b.end_time,
            "status": b.status
        })

    return Response(data)

@api_view(["GET"])
def barber_bookings(request):

    barber_id = request.GET.get("barber")

    if not barber_id:
        return Response({"error": "barber required"}, status=400)

    bookings = Booking.objects.filter(
        barber_id=barber_id,
        status="booked"
    ).order_by("date", "start_time")

    data = []

    for b in bookings:
        data.append({
            "id": b.id,
            "customer": b.customer_name,
            "phone": b.customer_phone,
            "service": b.service.name,
            "date": b.date,
            "start_time": b.start_time,
            "end_time": b.end_time
        })

    return Response(data)


@api_view(["DELETE"])
def delete_block(request, block_id):

    try:
        block = BarberBlock.objects.get(id=block_id)
    except BarberBlock.DoesNotExist:
        return Response({"error": "block not found"}, status=404)

    block.delete()

    return Response({"message": "block removed"})