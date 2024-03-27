def taskListResponse(data) -> list:
    tasklist=[]
    for el in data:
        tasklist.append({
            "_id": str(el["_id"]),
            "name": el["name"],
            "description": el["description"],
            "status": el["status"]
        })
    return tasklist
        

def taskResponse(data) -> dict:
    return {
            "_id": str(data["_id"]),
            "name": data["name"],
            "description": data["description"],
            "status": data["status"]
        }