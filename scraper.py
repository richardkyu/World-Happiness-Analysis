import bs4
from bs4 import BeautifulSoup
import requests

def scrape_news(input_from_click):
    input_from_click_processed = input_from_click.replace(" ","\%20")
    country_name = input_from_click_processed
    search_term=country_name+'\%20happiness'+f'"{country_name}"'
    news_url=f"https://news.google.com/rss/search?q={search_term}"
    r=requests.get(news_url)
    xml_page=r.content

    soup_page = BeautifulSoup(xml_page,"xml")
    news_list=soup_page.findAll("item")
    
    news_articles = ""
    # Print news title, url and publish date

    for i, news in enumerate(news_list[:25]):
        #print(news.title.text)
        news_articles+='<a href = "'+news.link.text+'" target ="_blank">'+str(i+1)+'. '+news.title.text+'</a></br>'
        #print(news.link.text)
        #print(news.pubDate.text)
        news_articles+=news.pubDate.text+'</br>'
        #print("-"*60)
        news_articles+="-"*60+'</br>'
        
    #print(f"Number of articles: {len(news_list)}")
    return news_articles


