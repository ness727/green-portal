import { ChangeEvent, Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { Card } from '../ui/card'
import axios from 'axios'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Papago() {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [myTxt, setMyTxt] = useState('')
  const [langCode, setLangCode] = useState('en');
  const [translatedTxt, setTranslatedTxt] = useState('');
  const [selectedOption, setSelectedOption] = useState('영어');
  const langMap: { [key: string]: string } = {
    'ko': '한국어',
    'en': '영어',
    'ja': '일본어',
    'zh-CN': '중국어 간체',
    'zh-TW': '중국어 번체',
    'vi': '베트남어',
    'id': '인도네시아어',
    'th': '태국어',
    'de': '독일어',
    'ru': '러시아어',
    'es': '스페인어',
    'it': '이탈리아어',
    'fr': '프랑스어'
  };

  const handleValueChange = (newValue: string) => {
    setSelectedOption(langMap[newValue]);
  };

  const translate = () => {
    if (myTxt) {
      axios.post('/api/papago', {target: langCode, text: myTxt})
      .then((response) => setTranslatedTxt(response.data))
      .catch(error => console.log(error));
    }
  }

  return (
    <>
      <div onClick={() => setOpen(true)}>
        <Button className='mx-4'>
          번역
        </Button>
      </div>
      
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10 dark:bg-gray-800" initialFocus={cancelButtonRef} onClose={() => {}}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-900 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl">
                  <div className="bg-white dark:bg-gray-900 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="">
                      <div className="mx-auto flex justify-between h-12 flex-shrink-0 rounded-full sm:mx-0 sm:h-10 mb-4">
                        <div className='flex flex-wrap'>
                          <Dialog.Title as="h1" className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200 mt-2">
                            번역 - Powerd by 
                          </Dialog.Title>
                          <img className='w-[40px] h-[40px]' src='https://papago.naver.com/e3bff6deb50f078fe094f764fac152e8.png' />
                          <Dialog.Title as="h1" className="text-base font-semibold leading-6 text-gray-900 dark:text-gray-200 mt-2">
                            Papago
                          </Dialog.Title>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline">{selectedOption}</Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>언어를 선택하세요</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuRadioGroup value={langCode} onValueChange={(e) => {setLangCode(e); handleValueChange(e);}}>
                              <DropdownMenuRadioItem value="ko">한국어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="en">영어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="ja">일본어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="zh-CN">중국어 간체</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="zh-TW">중국어 번체</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="vi">베트남어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="id">인도네시아어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="th">태국어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="de">독일어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="ru">러시아어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="es">스페인어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="it">이탈리아어</DropdownMenuRadioItem>
                              <DropdownMenuRadioItem value="fr">프랑스어</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex justify-center mt-3 text-center sm:mt-0 sm:text-left w-full">
                          <Textarea placeholder="번역할 내용을 입력하세요. 언어는 자동으로 감지됩니다." onChange={(e) => setMyTxt(e.target.value)} className='w-3/5 mr-2'/>
                          <Textarea placeholder="여기에 번역 결과가 표시됩니다." value={translatedTxt} className='w-3/5 ml-2' disabled />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <Button className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto">
                      <div onClick={() => translate()}>
                        번역하기
                      </div>
                    </Button>
                    <Button className="mt-3 inline-flex w-full justify-center rounded-md bg-white dark:bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto">
                      <div onClick={() => {setOpen(false); setLangCode('en'); setTranslatedTxt('');}} ref={cancelButtonRef}>
                        취소
                      </div>
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
