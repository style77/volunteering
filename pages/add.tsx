import { NextPage } from "next"
import Head from "next/head"

const Add:NextPage= () => {
    return(
        <>
        <Head>
        <title>Volunteering - Dodawanie</title>
        </Head>
        <main className="font-inter flex min-h-screen flex-col py-2">
            <div className="font-semibold text-4xl xl:text-6xl text-main-color my-6 ml-6">
                Dodawanie nowego wolonariatu 
            </div>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <div className="flex flex-col basis-1/12">
                        <label htmlFor="volunteering-name" className="text-main-color ">
                            Nazwa wolontariatu
                        </label>
                        <input id="volunteering-name" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                    </div>
                    <div className="flex flex-col w-80">
                        <label htmlFor="fundation-name" className="text-main-color ">
                            Nazwa fundacji
                        </label>
                        <input id="fundation-name" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                    </div>
                    <div className="flex flex-col w-80">
                        <label htmlFor="volunteering-city" className="text-main-color ">
                            Miasto
                        </label>
                        <select id="volunteering-city" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                    </div>
                    <div className="flex flex-col w-80">
                        <label htmlFor="volunteering-type" className="text-main-color ">
                            Typ
                        </label>
                        <select id="volunteering-type" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                    </div>
                    <div className="flex flex-col w-80">
                        <label htmlFor="volunteering-term" className="text-main-color ">
                            Okres
                        </label>
                        <select id="volunteering-term" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                    </div>
                    <div className="flex flex-row">
                        <div className="flex flex-col w-80">
                            <label htmlFor="paid" className="text-main-color ">
                                Płatne
                            </label>
                            <input type="checkbox" id="paid" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                        </div>
                        <div className="flex flex-col w-80">
                            <label htmlFor="not-paid" className="text-main-color ">
                                Bezpłatne
                            </label>
                            <input type="checkbox" id="not-paid" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                        </div>
                    </div>
                    
                </div>
                <div className="flex flex-col">
                    <label htmlFor="volunteering-description" className="text-main-color ">
                            Nazwa wolontariatu
                    </label>
                    <input id="volunteering-description" className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"/>
                </div>

            </div>
        </main>
        </>
    )
}

export default Add