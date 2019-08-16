# World Happiness Analysis
A project using multi-year datasets to visualize happiness as a function of factors such as geographic region, economic indicators, and other significant sociocultural factors.

![Summary Picture](https://i.imgur.com/5HJ9JzN.png)

[Visit the Demo Site](https://rocky-everglades-66561.herokuapp.com/)

## Background information
The happiness scores and rankings use data from the Gallup World Poll.
The scores are based on answers to the main life evaluation question asked in the poll.
This question, known as the Cantril ladder, asks respondents to think of a ladder with the best possible life for them being a 10 and the worst possible life being a 0 and to rate their own current lives on that scale.

**Data Sources**

https://www.kaggle.com/unsdsn/world-happiness#2017.csv

https://www.kaggle.com/zillow/zecon#all_available_metrics.json

https://www.kaggle.com/worldbank/world-development-indicators

https://newsapi.org/sources


Table of contents
=================

<!--ts-->
   1. [General Country Information](#General-Information)
   2. [Choropleths](#Choropleths)
   3. [Vega / Plotly Visualizations](#Vega-Visualizations)
   4. [Dynamic Country Data and News](#Dynamic-Country-Data-and-News)

<!--te-->

General Information
=================
The general information section of this project provides facts about various countries based on two inputs. 

    (1) A user clicking on the scrape button on one of the choropleth maps or 
    (2) A user manually typing in the name of a country.

Initially blank, the CIA Factbook entry is loaded up as an IFrame based on the user's request. Below is an image showing the IFrame description that is generated. Note that users are able to scroll down on the IFrame for more information, and that many important statistics concerning GDP, politics, demographics, important traditions, and similarly pertinent information is given along with the most common symbolic representations of that country at the very top.

![CIA_Factbook](https://i.imgur.com/VcTU12J.png)

As a result, the user is able to access a high-level summary of a country's information to help guide and inform their own exploration of the data. For instance, a user might draw conclusions that the population per square mile on average in a country relates to the happiness based on their use of this website to browse the data.

Choropleths
=================
Choropleths represent and excellent way for users to visualize a large amount of numerical data, often on a scale, for comparison. A choropleth allows users to identify trends based on the potential concentration of happiness outcomes in a certain area because it associates color with the relative position of values on a scale.

These choropleths are created through the Javascript library leaflet, and contain a number of interactive features, include a tooltip.

For reference, clicking within a country's borders allows users to see the happiness score of the country, along with the rank of that country, a flag is also show beside each country's name.

Clicking on scrape will immediately bring the CIA Factbook entry up in general information for the user's perusal and a set of current news articles at the bottom, so users have access to current events to aid their judgments.

![Choropleth](https://i.imgur.com/ZFE73VS.png)