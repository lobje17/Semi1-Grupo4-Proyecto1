FROM python:3.9 
# Or any preferred Python version.
ADD app.py .
RUN pip install requests beautifulsoup4 python-dotenv
RUN pip install flask
RUN pip install flask_mysqldb
RUN pip install boto3
RUN pip install flask_cors
CMD ["python", "./app.py"] 
# Or enter the name of your unique directory and parameter set.