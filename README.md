# Gauge
A fairly simple web app to estimate gas cost when driving from point A to B. Uses Google Maps JavaScript API to find the fastest route using current conditions and calculates the distance of that route. It then calculates the cost of trip based on how much gas it thinks the trip will use. 

Implemented in plain JavaScript and HTML with Bootstrap and a little custom CSS for styling.

* currently you will need to enter all the information for it to estimate the cost of the trip, but eventually it will pull data from a few different api's to get mpg and gas price

* its biggest weakness is that it doesn't model real world gas usage all that well, relying on one MPG number to calcualate gas use rate.
