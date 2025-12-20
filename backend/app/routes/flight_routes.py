from fastapi import APIRouter, Query, HTTPException
from app.services.flight_service import resolve_city_to_airport
from app.services.path_finder import find_shortest_path

router = APIRouter(prefix="/flights", tags=["Flights"])

@router.get("/search")
def search_flights(
    source: str = Query(...),
    destination: str = Query(...),
    date: str = Query(...)
):
    source_code = resolve_city_to_airport(source)
    if not source_code:
        raise HTTPException(status_code=404, detail="Source not found")

    destination_code = resolve_city_to_airport(destination)
    if not destination_code:
        raise HTTPException(status_code=404, detail="Destination not found")

    result = find_shortest_path(source_code, destination_code)
    if not result:
        raise HTTPException(status_code=404, detail="No route found")

    return {
        "source": source_code,
        "destination": destination_code,
        "date": date,
        "total_distance": result["total_distance"],
        "route": result["route"]
    }
