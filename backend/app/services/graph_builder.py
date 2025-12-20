from app.db import get_connection

def build_graph():
    """
    Builds adjacency list graph from routes table.
    Graph format:
    {
      'MYQ': [('BLR', 150)],
      'BLR': [('HYD', 570)],
      ...
    }
    """
    graph = {}

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT source_airport, destination_airport, distance_km
        FROM routes
    """)

    for row in cursor.fetchall():
        src = row["source_airport"]
        dst = row["destination_airport"]
        dist = row["distance_km"]

        if src not in graph:
            graph[src] = []

        graph[src].append((dst, dist))

    cursor.close()
    conn.close()

    return graph
