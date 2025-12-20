from app.db import get_connection
import heapq

def find_shortest_path(source, destination):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("SELECT source_airport, destination_airport, distance_km FROM routes")
    rows = cursor.fetchall()

    conn.close()

    # Build graph
    graph = {}
    for row in rows:
        s = row["source_airport"]
        d = row["destination_airport"]
        w = row["distance_km"]

        graph.setdefault(s, []).append((d, w))
        graph.setdefault(d, []).append((s, w))  # bidirectional

    # Dijkstra
    pq = [(0, source, [source])]
    visited = set()

    while pq:
        dist, node, path = heapq.heappop(pq)

        if node == destination:
            return {
                "total_distance": dist,
                "route": path
            }

        if node in visited:
            continue
        visited.add(node)

        for neigh, w in graph.get(node, []):
            if neigh not in visited:
                heapq.heappush(pq, (dist + w, neigh, path + [neigh]))

    return None
