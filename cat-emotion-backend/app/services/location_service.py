import requests
from requests.exceptions import RequestException

OVERPASS_SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.nchc.org.tw/api/interpreter"
]


def overpass_query(tags: list, lat: float, lon: float, radius_m: int = 10000):
    tag_queries = ""
    for key, value in tags:
        tag_queries += f'''
        node["{key}"="{value}"](around:{radius_m},{lat},{lon});
        way["{key}"="{value}"](around:{radius_m},{lat},{lon});
        relation["{key}"="{value}"](around:{radius_m},{lat},{lon});
        '''

    query = f"""
    [out:json];
    (
        {tag_queries}
    );
    out center tags;
    """

    for server in OVERPASS_SERVERS:
        try:
            response = requests.post(
                server,
                data=query,
                timeout=15
            )
            response.raise_for_status()

            data = response.json()
            results = []

            for el in data.get("elements", []):
                results.append({
                    "name": el.get("tags", {}).get("name", "Unnamed Place"),
                    "category": el.get("tags", {}),
                    "lat": el.get("lat") or el.get("center", {}).get("lat"),
                    "lon": el.get("lon") or el.get("center", {}).get("lon")
                })

            return results

        except RequestException:
            # Try next Overpass server
            continue

    # If all servers fail, return empty list safely
    return []


def search_all_pet_services(lat: float, lon: float):
    tags = [
        ("amenity", "veterinary"),
        ("shop", "pet"),
        ("shop", "pet_grooming"),
        ("amenity", "animal_boarding"),
        ("amenity", "animal_shelter")
    ]

    return overpass_query(tags, lat, lon)
