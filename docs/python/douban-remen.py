# coding: UTF-8
import json
import urllib2
import re
import ssl 
ssl._create_default_https_context = ssl._create_unverified_context
def crawl(url):
 page = urllib2.urlopen(url)
 contents = page.read()
 return contents;

if __name__=='__main__':
 json_arr=crawl('https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0') 
 info=json.loads(json_arr)
 for item in info['subjects']:
  print '片名:'+item['title'].encode('utf-8')
  print '评分:'+item['rate'].encode('utf-8')
  print '豆瓣链接:'+item['url'].encode('utf-8')+"\n"

                
                
