from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from starlette.templating import Jinja2Templates
import pyodbc
import os
import webbrowser
import threading
import time
import uvicorn

app = FastAPI()

# Get the current directory (recruiter_welcome folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Mount static files and templates
app.mount("/static", StaticFiles(directory=BASE_DIR), name="static")
templates = Jinja2Templates(directory=BASE_DIR)

# Mount portfolio directories
ROOT_DIR = os.path.dirname(BASE_DIR)
full_portfolio_path = os.path.join(ROOT_DIR, "full_portfolio")
short_portfolio_path = os.path.join(ROOT_DIR, "short_portfolio") 
doubt_destroyer_path = os.path.join(ROOT_DIR, "doubt_destroyer")

if os.path.exists(full_portfolio_path):
    app.mount("/full_portfolio", StaticFiles(directory=full_portfolio_path, html=True), name="full_portfolio")

if os.path.exists(short_portfolio_path):
    app.mount("/short_portfolio", StaticFiles(directory=short_portfolio_path, html=True), name="short_portfolio")

if os.path.exists(doubt_destroyer_path):
    app.mount("/doubt_destroyer", StaticFiles(directory=doubt_destroyer_path, html=True), name="doubt_destroyer")

# Database connection
DRIVER = "ODBC Driver 17 for SQL Server"
SERVER = "DESKTOP-CH8UTUA\\SQLEXPRESS001"
DATABASE = "portfoliodb"
USERNAME = "sa"
PASSWORD = "12345678"

def get_db_connection():
    connection_string = (
        f"DRIVER={{{DRIVER}}};"
        f"SERVER={SERVER};"
        f"DATABASE={DATABASE};"
        f"UID={USERNAME};"
        f"PWD={PASSWORD};"
    )
    return pyodbc.connect(connection_string)

def get_visitor_stats():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Get total visits count
    cursor.execute("SELECT COUNT(*) FROM visits")
    total_visits = cursor.fetchone()[0]
    
    # Get unique companies count (excluding Anonymous)
    cursor.execute("SELECT COUNT(DISTINCT company_name) FROM visits WHERE company_name != 'Anonymous'")
    unique_companies = cursor.fetchone()[0]
    
    # Get anonymous visits count
    cursor.execute("SELECT COUNT(*) FROM visits WHERE company_name = 'Anonymous'")
    anonymous_count = cursor.fetchone()[0]
    
    cursor.close()
    conn.close()
    
    return {
        'total_visits': total_visits,
        'unique_companies': unique_companies,
        'anonymous_count': anonymous_count
    }

@app.get("/", response_class=HTMLResponse)
async def welcome(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/submit_company", response_class=HTMLResponse)
async def submit_company(request: Request, company_name: str = Form(...), anonymous: str = Form(None)):
    has_company_name = company_name.strip() != ""
    is_anonymous = anonymous == "on"
    
    if has_company_name and is_anonymous:
        return templates.TemplateResponse("index.html", {
            "request": request, 
            "error": "Please choose only one option: company name OR anonymous."
        })
    
    if not has_company_name and not is_anonymous:
        return templates.TemplateResponse("index.html", {
            "request": request, 
            "error": "Please enter your company name or choose to stay anonymous."
        })
    
    # Determine what to store
    if is_anonymous:
        company_to_store = "Anonymous"
    else:
        company_to_store = company_name.strip()

    # Insert into database
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("INSERT INTO visits (company_name) VALUES (?)", company_to_store)
    conn.commit()
    cursor.close()
    conn.close()
    
    return RedirectResponse(url=f"/next_page?current={company_to_store}", status_code=303)

@app.get("/next_page", response_class=HTMLResponse)
async def next_page(request: Request, current: str = "Visitor"):
    stats = get_visitor_stats()
    
    return templates.TemplateResponse("next_page.html", {
        "request": request,
        "visit_count": stats['total_visits'],
        "unique_companies": stats['unique_companies'],
        "anonymous_count": stats['anonymous_count'],
        "current_visitor": current
    })

# Redirect routes
@app.get("/full_portfolio/")
async def redirect_full():
    return RedirectResponse(url="/full_portfolio/index.html")

@app.get("/short_portfolio/")
async def redirect_short():
    return RedirectResponse(url="/short_portfolio/index.html")

@app.get("/doubt_destroyer/")
async def redirect_doubt():
    return RedirectResponse(url="/doubt_destroyer/index.html")

def open_browser():
    time.sleep(1.5)
    webbrowser.open("http://localhost:8000")

if __name__ == "__main__":
    print("🚀 Starting Portfolio Gateway Server...")
    threading.Thread(target=open_browser).start()
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
