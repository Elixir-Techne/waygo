from django.http import JsonResponse
from django.views.decorators.http import require_GET, require_POST
from django.views.decorators.csrf import csrf_exempt
import json
from django.db.models import Q
from .models import Lot, LotData


@require_GET
def get_all_lots(request):
    lots = Lot.objects.all().order_by("-start_time")
    data = [
        {"id": lot.id, "time": lot.start_time, "species": lot.species} for lot in lots
    ]
    return JsonResponse(data, safe=False)


@require_GET
def get_lots_in_time_period(request):
    start_time = request.GET.get("start_time")
    end_time = request.GET.get("end_time")
    lots = Lot.objects.filter(start_time__range=[start_time, end_time]).order_by(
        "-start_time"
    )
    data = [
        {"id": lot.id, "time": lot.start_time, "species": lot.species} for lot in lots
    ]
    return JsonResponse(data, safe=False)


@require_GET
def get_lots_by_species(request):
    species_list = request.GET.getlist("species")
    lots = Lot.objects.filter(species__in=species_list).order_by("-start_time")
    data = [
        {"id": lot.id, "time": lot.start_time, "species": lot.species} for lot in lots
    ]
    return JsonResponse(data, safe=False)


@require_GET
def get_lots_by_chamber(request):
    chamber = request.GET.get("chamber")
    lots = Lot.objects.filter(chamber=chamber).order_by("-start_time")
    data = [
        {"id": lot.id, "time": lot.start_time, "species": lot.species} for lot in lots
    ]
    return JsonResponse(data, safe=False)


@require_GET
def get_lot_details(request, lot_id):
    try:
        lot = Lot.objects.get(id=lot_id)
        data = {
            "id": lot.id,
            "company": lot.company.name,
            "chamber": lot.chamber,
            "start_time": lot.start_time,
            "complete_time": lot.complete_time,
            "program_name": lot.program_name,
            "total_commands": lot.total_commands,
            "species": lot.species,
            "quantity": lot.quantity,
            "details": lot.details,
        }
        return JsonResponse(data)
    except Lot.DoesNotExist:
        return JsonResponse({"error": "Lot not found"}, status=404)


@require_GET
def get_lotdata_by_lot(request, lot_id):
    try:
        lotdata = LotData.objects.filter(lot_id=lot_id).order_by("time")
        data = []
        for ld in lotdata:
            item = {
                "time": ld.time,
                "command_name": ld.command_name,
                "wbt1": ld.wbt1,
                "wbt2": ld.wbt2,
                "dbt1": ld.dbt1,
                "dbt2": ld.dbt2,
                "rh": ld.rh,
                "mc1": ld.mc1,
                "mc2": ld.mc2,
                "mc3": ld.mc3,
                "mc4": ld.mc4,
                "mc5": ld.mc5,
                "mc6": ld.mc6,
                "mc7": ld.mc7,
                "mc8": ld.mc8,
                "amc": ld.amc,
                "wood_temp1": ld.wood_temp1,
                "wood_temp2": ld.wood_temp2,
                "flaps": ld.flaps,
                "heat": ld.heat,
                "spray": ld.spray,
                "fan_cw": ld.fan_cw,
                "fan_ccw": ld.fan_ccw,
                "reserved": ld.reserved,
                "details": ld.details,
            }
            data.append(item)
        return JsonResponse(data, safe=False)
    except LotData.DoesNotExist:
        return JsonResponse({"error": "LotData not found"}, status=404)


"""
To developer: In production, all these POST endpoints will be used by the drying kilns computers
to post new data into the database.
As you can see, I have not implemented authorization and https, so please implement.
Please also provide sample Python code to post data using these endpoints.
"""


@csrf_exempt
@require_POST
def create_lot(request):
    try:
        data = json.loads(request.body)
        lot = Lot.objects.create(
            id=data["id"],
            company_id=data["company_id"],
            chamber=data["chamber"],
            start_time=data["start_time"],
            complete_time=data.get("complete_time", None),
            program_name=data.get("program_name", None),
            total_commands=data.get("total_commands", None),
            species=data.get("species", "none"),
            quantity=data.get("quantity", 0),
            details=data.get("details", None),
            duration=data.get("duration", None),
        )
        return JsonResponse({"success": True, "lot_id": lot.id}, status=201)
    except (KeyError, ValueError):
        return JsonResponse({"error": "Invalid data provided"}, status=400)


@csrf_exempt
@require_POST
def create_lotdata(request):
    try:
        data = json.loads(request.body)
        lotdata = LotData.objects.create(
            lot_id_id=data["lot_id"],
            time=data["time"],
            command_name=data["command_name"],
            wbt1=data["wbt1"],
            wbt2=data.get("wbt2", None),
            dbt1=data["dbt1"],
            dbt2=data.get("dbt2", None),
            rh=data.get("rh", None),
            mc1=data["mc1"],
            mc2=data["mc2"],
            mc3=data["mc3"],
            mc4=data["mc4"],
            mc5=data.get("mc5", None),
            mc6=data.get("mc6", None),
            mc7=data.get("mc7", None),
            mc8=data.get("mc8", None),
            amc=data["amc"],
            wood_temp1=data.get("wood_temp1", None),
            wood_temp2=data.get("wood_temp2", None),
            flaps=data.get("flaps", None),
            heat=data.get("heat", None),
            spray=data.get("spray", None),
            fan_cw=data.get("fan_cw", None),
            fan_ccw=data.get("fan_ccw", None),
            reserved=data.get("reserved", None),
            details=data.get("details", None),
        )
        return JsonResponse({"success": True, "lotdata_id": lotdata.id}, status=201)
    except (KeyError, ValueError):
        return JsonResponse({"error": "Invalid data provided"}, status=400)


"""
To developer:
I need 2 additional endpoints. 1 is for the kilns computer to report status (StatusReport model)
and the 2 one is to register Lot.complete_time of the current lot with value
once the drying lot is completed at the kiln.
"""
