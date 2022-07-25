import Image from "next/image";
import {useRouter} from "next/router";
import {cnb} from "cnbuilder";

export default function AdminLayout(props) {
    const router = useRouter()
    let routeName

    switch (router.pathname) {
        case '/':
            routeName = 'Анкеты'
            break

        case '/vacancies':
            routeName = 'Вакансии'
            break

        case '/reviews':
            routeName = 'Отзывы'
            break

        case '/news':
            routeName = 'Новости'
            break

        case '/stats':
            routeName = 'Статистика'
            break
    }

    return <div>
        <aside className="sidenav">
            <div>
                <Image src={'/logo.full.svg'} width={138} height={39}/>

                <div className={'flex column'} style={{gap: '48px 0', marginTop: 75}}>
                    <div className={cnb("nav-link", router.pathname === '/' ? 'active' : '')}>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                                stroke="#252420" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Анкеты</span>
                    </div>

                    <div className={cnb("nav-link", router.pathname === '/vacancies' ? 'active' : '')}>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                                stroke="#252420" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Вакансии</span>
                    </div>

                    <div className={cnb("nav-link", router.pathname === '/reviews' ? 'active' : '')}>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                                stroke="#252420" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Отзывы</span>
                    </div>

                    <div className={cnb("nav-link", router.pathname === '/news' ? 'active' : '')}>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                                stroke="#252420" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Новости</span>
                    </div>

                    <hr className="dropdown-divider"/>

                    <div className={cnb("nav-link", router.pathname === '/stats' ? 'active' : '')}>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                                stroke="#252420" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>

                        <span>Статистика</span>
                    </div>
                </div>
            </div>
            <div>
                <div className="nav-link">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                            stroke="#252420" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <span>Выход</span>
                </div>
            </div>
        </aside>
        <main>
            <nav>
                <h3>{routeName}</h3>

                <div className={'flex'} style={{gap: 24}}>
                    <button className={'btn btn-accent1-tertiary'}>Добавить анкету
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                             className={'btn-icon-right'}>
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                  d="M1.48711 8.94845C0.906359 8.94845 0.435565 9.41925 0.435565 10C0.435565 10.5808 0.906359 11.0515 1.48711 11.0515L8.84795 11.0515L8.84795 18.4124C8.84795 18.9931 9.31874 19.4639 9.89949 19.4639C10.4802 19.4639 10.951 18.9931 10.951 18.4124L10.951 11.0515H18.3119C18.8926 11.0515 19.3634 10.5808 19.3634 10C19.3634 9.41925 18.8926 8.94845 18.3119 8.94845H10.951L10.951 1.58762C10.951 1.00687 10.4802 0.536072 9.89949 0.536072C9.31874 0.536071 8.84795 1.00687 8.84795 1.58762L8.84795 8.94845L1.48711 8.94845Z"
                                  fill="#58536C"/>
                        </svg>
                    </button>

                    <div>
                        <button className={'btn btn-disabled-bg'} style={{padding: '7px 11px', marginTop: 5}}>
                            <svg width="16" height="14" viewBox="0 0 16 14" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.4135 12.8736C8.18683 12.9536 7.8135 12.9536 7.58683 12.8736C5.6535 12.2136 1.3335 9.46023 1.3335 4.79356C1.3335 2.73356 2.9935 1.06689 5.04016 1.06689C6.2535 1.06689 7.32683 1.65356 8.00016 2.56023C8.6735 1.65356 9.7535 1.06689 10.9602 1.06689C13.0068 1.06689 14.6668 2.73356 14.6668 4.79356C14.6668 9.46023 10.3468 12.2136 8.4135 12.8736Z"
                                    stroke="#999689" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>

                    <div className={'flex items-center'} style={{gap: 16}}>
                        <Image src={'/icons/avatar.svg'} height={32} width={32} />

                        <div>
                            <p className="textMBold">Максим Добжанский</p>
                            <p className="textXS">Администратор</p>
                        </div>
                    </div>
                </div>
            </nav>
        </main>
    </div>
}
