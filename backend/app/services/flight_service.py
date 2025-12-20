from app.db import get_connection

def resolve_city_to_airport(city_name: str):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute(
        "SELECT airport_code FROM airports WHERE city = %s",
        (city_name,)
    )
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    return row["airport_code"]
