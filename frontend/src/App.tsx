import axios, { AxiosResponse } from 'axios';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useDispatch } from "react-redux";
import NewsCard from './menu/NewsCard';
import BlogCard from './menu/BlogCard';
import { useState, useEffect } from 'react';
import { setNews } from '@/modules/newsModule';
import { setBlog } from '@/modules/blogModule';
import { resetPage } from '@/modules/pageModule';
import { News } from './main';
import { Blog } from './main';

import { ButtonIcon } from './ButtonIcon';
import { useSelector } from 'react-redux';
import { RootState } from './modules';

export default function App() {
  const dispatch = useDispatch();
  const newsList : News[] = useSelector( (state: RootState) => state.newsReducer.data );
  const blogList : Blog[] = useSelector( (state: RootState) => state.blogReducer.data );
  const page : number = useSelector( (state: RootState) => state.pageReducer.page );

  const [searchText, setSearchText] = useState('');
  const menus = { 'none': 0 , 'blog': 1, 'image': 2, 'news': 3 }
  const [menu, setMenu] = useState(menus.none);

  const searchNews = () => {
    if (searchText) {
      axios.get('/api/search/news', { params: {query: searchText, start: page}})
      .then((response: AxiosResponse<News[]>) => dispatch(setNews(response.data)))
      .catch(error => console.log(error));
    }
  }
  const searchBlog = () => {
    if (searchText) {
      axios.get('/api/search/blog', { params: {query: searchText, start: page}})
      .then((response: AxiosResponse<Blog[]>) => dispatch(setBlog(response.data)))
      .catch(error => console.log(error));
    }
  }

  useEffect(() => {
    switch (menu) {
      case menus.blog:
        searchBlog();
        break;
      case menus.news:
        searchNews();
        break;
      case menus.image:

        break;
    }
  }, [page, menu]);

  useEffect(() => {
    dispatch(resetPage());
  }, [menu]);

  return (
    <div>
      <div className="relative">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <div className='search-container mx-auto'>
              <div onClick={() => setMenu(menus.none)} className='cursor-pointer'>
                <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-gray-200 main-green">
                  초록창
                </h1>
                <h3 className="mt-3 text-lg text-gray-600 dark:text-gray-400">
                  검색을 원하는 어떤 것이든 입력하세요.
                </h3>
              </div>
              <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                <form>
                  <div className="relative z-10 flex space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]">
                    <div className="flex-[1_0_0%]">
                      <Input value={searchText} onChange={e => setSearchText(e.target.value)} type="text" name="hs-search-article-1" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600" placeholder="여기에 입력하세요"/>
                    </div>
                    <div className="flex-[0_0_auto]">
                      <Button asChild>
                        <input type='button' value="검색" onClick={() => {
                          if(searchText) {
                            setMenu(menus.blog)
                          }
                          else {
                            setMenu(menus.none);
                            // 각 뉴스, 블로그 비우기
                            // 제목 눌렀을 때 검색 비우고 홈으로
                          }
                          dispatch(resetPage());
                        }}/>
                      </Button>
                    </div>
                  </div>
                </form>

                <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                  <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                    <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                    <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                  </svg>
                </div>

                <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                  <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
            {(menu != menus.none) ?
              <div className="mt-10 sm:mt-20">
                <a className={`${menu == menus.blog ? 'my-button': ''} m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`} href="#"
                  onClick={() => setMenu(menus.blog)}>
                  <svg className="flex-shrink-0 w-3 h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                  </svg>
                  블로그
                </a>
                <a className={`${menu == menus.image ? 'my-button': ''} m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`} href="#"
                  onClick={() => setMenu(menus.image)}>
                  <svg className="flex-shrink-0 w-3 h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                  </svg>
                  이미지
                </a>
                <a className={`${menu == menus.news ? 'my-button': ''} m-1 py-3 px-4 inline-flex items-center gap-x-2 text-sm rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`} href="#"
                  onClick={() => setMenu(menus.news)}>
                  <svg className="flex-shrink-0 w-3 h-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13a.5.5 0 0 1 0 1 .5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1 0-1 .5.5 0 0 1 0-1 .5.5 0 0 1-.46-.302l-.761-1.77a1.964 1.964 0 0 0-.453-.618A5.984 5.984 0 0 1 2 6zm6-5a5 5 0 0 0-3.479 8.592c.263.254.514.564.676.941L5.83 12h4.342l.632-1.467c.162-.377.413-.687.676-.941A5 5 0 0 0 8 1z"/>
                  </svg>
                  뉴스
                </a>
              </div>
              : ''
            }
            <div className="Header my-card">
            {
              (menu == menus.blog) ? <BlogCard />
              : (menu == menus.news) ? <NewsCard />
              : ''
            }
            </div>

            {(menu == menus.blog && blogList.length > 0) 
              || (menu == menus.news && newsList.length > 0)
              ? <ButtonIcon /> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}