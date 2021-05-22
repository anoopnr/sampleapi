# sampleapi
Express api to demonstrate OAuth workflow, middle ware for validation and unit testing

## Steps to install and run application
Clone the sampleapi\
intall the dependencies using npm install \
run the app using npm start\
to test the app use npm test

App will be running in port 3000\
can test the app is running by checking http://localhost:3000/api

Pass data as json in body

To get auth token use following route\
http://localhost:3000/gettoken \
respose body will have a 'token'

Pass this token in the get/post products requests\
http://localhost:3000/api/products \
make sure to pass 'Authorization' with 'Bearer ' tag in front of the token