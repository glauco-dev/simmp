export default function({imagens}:{imagens:string[]}){
    return(
<div id="custom-controls-gallery" className="relative w-full" data-carousel="slide">
    <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {imagens.map((src, index)=>
        <div className="hidden duration-700 ease-in-out" key={`gallery_item+${index}`} data-carousel-item>
                <img src={src} className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt=""/>
        </div>
        )}
        
    </div>
    <div className="flex justify-center items-center pt-4">
        <button type="button" className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none" data-carousel-prev>
            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                </svg>
                <span className="sr-only">Anterior</span>
            </span>
        </button>
        <button type="button" className="flex justify-center items-center h-full cursor-pointer group focus:outline-none" data-carousel-next>
            <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
                <span className="sr-only">Próximo</span>
            </span>
        </button>
    </div>
</div>
    )
}