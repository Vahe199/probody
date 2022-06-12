import React from "react";
import {GlobalContext} from "../../contexts/Global.js";
import ShareInSocialMedia from "../../components/ShareInSocialMedia";
import {withRouter} from "next/router.js";
import ArticleCard from "../../components/ArticleCard";
import Paginator from "../../components/kit/Paginator";
import Objects from "../../helpers/Objects.js";
import Breadcrumbs from "../../components/kit/Breadcrumbs.jsx";
import Head from "next/head.js";
import {TITLE_POSTFIX} from "../../helpers/constants.js";

class BlogPage extends React.Component {
    static contextType = GlobalContext

    constructor(props) {
        super(props);

        this.state = {
            articles: [],
            page: 1,
            pageCount: 1
        }

        this.initPageLoad = this.initPageLoad.bind(this)
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount() {
        this.initPageLoad()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.router.query.page !== this.props.router.query.page) {
            window.scrollTo(0, 0)

            this.initPageLoad()
        }
    }

    handlePageChange(page) {
        if (page !== this.state.page
            && page > 0
            && page <= this.state.pageCount) {
            this.props.router.push({
                query: {
                    page
                }
            })
        }
    }

    async initPageLoad() {
        await this.setState({
            page: Number(this.props.router.query.page) || 1
        })

        await this.setState({
            articles: [
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Spikefish southern grayling cutthroat trout",
                    "photos": [
                        "https://images.ukrsalon.com.ua/files/1/1558/1369622/original/20120814155054.jpg",
                        'https://img.championat.com/s/735x490/news/big/q/j/massazh-kotoryj-umenshit-vashi-formy-vy-prosto-lezhite-i-hudeete_1564681008234562299.jpg',
                        'https://stamina.center/ru/wp-content/uploads/sites/2/2019/10/Stamina-likuvalnyj-masazh-01.jpg'
                    ],
                    "text": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish.\n" +
                        "<br />" +
                        "Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish threespine stickleback Cornish Spaktailed Bream. Pollock, cavefish pink salmon Sacramento blackfish king of herring. Goosefish parrotfish Colorado squawfish dealfish man-of-war fish, longfin escolar Celebes rainbowfish ghost flathead soldierfish zebra lionfish dogfish smoothtongue driftfish, pencilsmelt soldierfish porcupinefish wahoo Pacific argentine. Deep sea bonefish pikehead butterflyfish redmouth whalefish oilfish fire bar danio.",
                    "slug": "Derf808",
                    "createdAt": "2022-06-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Asian carps pompano longnose whiptail",
                    "photos": [
                        "https://img.championat.com/s/735x490/news/big/d/l/tehnika-tochechnogo-massazha-dlja-pohudenija_15905066501829841550.jpg",
                        'https://novaya.com.ua/wp-content/uploads/2021/09/massazh-spiny-1.jpg'
                    ],
                    "text": "Mahseer; beachsalmon snoek, pufferfish deep sea smelt brook trout jawfish merluccid hake panga. Grunt sculpin slimehead merluccid hake: pejerrey goldeye; tompot blenny banjo catfish crevice kelpfish madtom spiny dogfish round herring, cusk-eel sea dragon. Trout Blacksmelt smalltooth sawfish Redhorse sucker Pacific albacore walleye flat loach? Searobin pollock summer flounder triggerfish redtooth triggerfish northern sea robin: smooth dogfish tadpole fish. Mudsucker; soldierfish river stingray, \"bonytongue dwarf loach?\"\n" +
                        "<br />" +
                        "Threadfin bream. Earthworm eel basking shark basslet barred danio bluntnose knifefish pollock yellowtail clownfish ghost fish yellowmargin triggerfish tadpole cod! Bonytail chub sweeper thornyhead mummichog boga wolf-herring louvar guppy mud cat oceanic flyingfish spiny dogfish, Canthigaster rostrata duckbill eel kahawai wormfish zebra trout. European eel, devil ray tui chub channel bass archerfish handfish clown loach. Anemonefish mail-cheeked fish queen triggerfish needlefish, ponyfish Mexican golden trout, goldfish.\n" +
                        "<br />" +
                        "Mail-cheeked fish, \"yellowtail pike conger halfmoon roughy blue eye deepwater cardinalfish smoothtongue Razorback sucker redmouth whalefish, eulachon.\" Rainbowfish paradise fish sind danio, \"grunter, leaffish inanga, blue triggerfish zebra bullhead shark trumpeter mustard eel murray cod labyrinth fish,\" righteye flounder boafish. Jackfish, \"gombessa airsac catfish Shingle Fish queen danio; louvar pelican gulper mummichog Australian herring.\" Shortnose chimaera batfish dhufish beluga sturgeon arrowtooth eel stingfish tubeshoulder bamboo shark eeltail catfish aruana Sacramento blackfish livebearer swampfish. Mooneye marblefish luminous hake hussar prickleback unicorn fish pike conger slimy sculpin. Sevan trout redtooth triggerfish basking shark--Indian mul; lagena, anchovy, hammerhead shark. Sabertooth wormfish white marlin armored gurnard bigeye squaretail, Siamese fighting fish snapper herring smelt dory. Sauger, river stingray, silverside mustard eel vendace gudgeon cepalin, pearleye peacock flounder gulf menhaden, dealfish snubnose eel searobin dogfish ocean sunfish.",
                    "slug": "Derf434808",
                    "createdAt": "2022-05-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Spikefish southern grayling cutthroat trout",
                    "photos": [
                        "https://images.ukrsalon.com.ua/files/1/1558/1369622/original/20120814155054.jpg",
                        'https://img.championat.com/s/735x490/news/big/q/j/massazh-kotoryj-umenshit-vashi-formy-vy-prosto-lezhite-i-hudeete_1564681008234562299.jpg',
                        'https://stamina.center/ru/wp-content/uploads/sites/2/2019/10/Stamina-likuvalnyj-masazh-01.jpg'
                    ],
                    "text": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish.\n" +
                        "<br />" +
                        "Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish threespine stickleback Cornish Spaktailed Bream. Pollock, cavefish pink salmon Sacramento blackfish king of herring. Goosefish parrotfish Colorado squawfish dealfish man-of-war fish, longfin escolar Celebes rainbowfish ghost flathead soldierfish zebra lionfish dogfish smoothtongue driftfish, pencilsmelt soldierfish porcupinefish wahoo Pacific argentine. Deep sea bonefish pikehead butterflyfish redmouth whalefish oilfish fire bar danio.",
                    "slug": "Derf808",
                    "createdAt": "2022-06-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Asian carps pompano longnose whiptail",
                    "photos": [
                        "https://img.championat.com/s/735x490/news/big/d/l/tehnika-tochechnogo-massazha-dlja-pohudenija_15905066501829841550.jpg",
                        'https://novaya.com.ua/wp-content/uploads/2021/09/massazh-spiny-1.jpg'
                    ],
                    "text": "Mahseer; beachsalmon snoek, pufferfish deep sea smelt brook trout jawfish merluccid hake panga. Grunt sculpin slimehead merluccid hake: pejerrey goldeye; tompot blenny banjo catfish crevice kelpfish madtom spiny dogfish round herring, cusk-eel sea dragon. Trout Blacksmelt smalltooth sawfish Redhorse sucker Pacific albacore walleye flat loach? Searobin pollock summer flounder triggerfish redtooth triggerfish northern sea robin: smooth dogfish tadpole fish. Mudsucker; soldierfish river stingray, \"bonytongue dwarf loach?\"\n" +
                        "<br />" +
                        "Threadfin bream. Earthworm eel basking shark basslet barred danio bluntnose knifefish pollock yellowtail clownfish ghost fish yellowmargin triggerfish tadpole cod! Bonytail chub sweeper thornyhead mummichog boga wolf-herring louvar guppy mud cat oceanic flyingfish spiny dogfish, Canthigaster rostrata duckbill eel kahawai wormfish zebra trout. European eel, devil ray tui chub channel bass archerfish handfish clown loach. Anemonefish mail-cheeked fish queen triggerfish needlefish, ponyfish Mexican golden trout, goldfish.\n" +
                        "<br />" +
                        "Mail-cheeked fish, \"yellowtail pike conger halfmoon roughy blue eye deepwater cardinalfish smoothtongue Razorback sucker redmouth whalefish, eulachon.\" Rainbowfish paradise fish sind danio, \"grunter, leaffish inanga, blue triggerfish zebra bullhead shark trumpeter mustard eel murray cod labyrinth fish,\" righteye flounder boafish. Jackfish, \"gombessa airsac catfish Shingle Fish queen danio; louvar pelican gulper mummichog Australian herring.\" Shortnose chimaera batfish dhufish beluga sturgeon arrowtooth eel stingfish tubeshoulder bamboo shark eeltail catfish aruana Sacramento blackfish livebearer swampfish. Mooneye marblefish luminous hake hussar prickleback unicorn fish pike conger slimy sculpin. Sevan trout redtooth triggerfish basking shark--Indian mul; lagena, anchovy, hammerhead shark. Sabertooth wormfish white marlin armored gurnard bigeye squaretail, Siamese fighting fish snapper herring smelt dory. Sauger, river stingray, silverside mustard eel vendace gudgeon cepalin, pearleye peacock flounder gulf menhaden, dealfish snubnose eel searobin dogfish ocean sunfish.",
                    "slug": "Derf434808",
                    "createdAt": "2022-05-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Spikefish southern grayling cutthroat trout",
                    "photos": [
                        "https://images.ukrsalon.com.ua/files/1/1558/1369622/original/20120814155054.jpg",
                        'https://img.championat.com/s/735x490/news/big/q/j/massazh-kotoryj-umenshit-vashi-formy-vy-prosto-lezhite-i-hudeete_1564681008234562299.jpg',
                        'https://stamina.center/ru/wp-content/uploads/sites/2/2019/10/Stamina-likuvalnyj-masazh-01.jpg'
                    ],
                    "text": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish.\n" +
                        "<br />" +
                        "Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish threespine stickleback Cornish Spaktailed Bream. Pollock, cavefish pink salmon Sacramento blackfish king of herring. Goosefish parrotfish Colorado squawfish dealfish man-of-war fish, longfin escolar Celebes rainbowfish ghost flathead soldierfish zebra lionfish dogfish smoothtongue driftfish, pencilsmelt soldierfish porcupinefish wahoo Pacific argentine. Deep sea bonefish pikehead butterflyfish redmouth whalefish oilfish fire bar danio.",
                    "slug": "Derf808",
                    "createdAt": "2022-06-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Asian carps pompano longnose whiptail",
                    "photos": [
                        "https://img.championat.com/s/735x490/news/big/d/l/tehnika-tochechnogo-massazha-dlja-pohudenija_15905066501829841550.jpg",
                        'https://novaya.com.ua/wp-content/uploads/2021/09/massazh-spiny-1.jpg'
                    ],
                    "text": "Mahseer; beachsalmon snoek, pufferfish deep sea smelt brook trout jawfish merluccid hake panga. Grunt sculpin slimehead merluccid hake: pejerrey goldeye; tompot blenny banjo catfish crevice kelpfish madtom spiny dogfish round herring, cusk-eel sea dragon. Trout Blacksmelt smalltooth sawfish Redhorse sucker Pacific albacore walleye flat loach? Searobin pollock summer flounder triggerfish redtooth triggerfish northern sea robin: smooth dogfish tadpole fish. Mudsucker; soldierfish river stingray, \"bonytongue dwarf loach?\"\n" +
                        "<br />" +
                        "Threadfin bream. Earthworm eel basking shark basslet barred danio bluntnose knifefish pollock yellowtail clownfish ghost fish yellowmargin triggerfish tadpole cod! Bonytail chub sweeper thornyhead mummichog boga wolf-herring louvar guppy mud cat oceanic flyingfish spiny dogfish, Canthigaster rostrata duckbill eel kahawai wormfish zebra trout. European eel, devil ray tui chub channel bass archerfish handfish clown loach. Anemonefish mail-cheeked fish queen triggerfish needlefish, ponyfish Mexican golden trout, goldfish.\n" +
                        "<br />" +
                        "Mail-cheeked fish, \"yellowtail pike conger halfmoon roughy blue eye deepwater cardinalfish smoothtongue Razorback sucker redmouth whalefish, eulachon.\" Rainbowfish paradise fish sind danio, \"grunter, leaffish inanga, blue triggerfish zebra bullhead shark trumpeter mustard eel murray cod labyrinth fish,\" righteye flounder boafish. Jackfish, \"gombessa airsac catfish Shingle Fish queen danio; louvar pelican gulper mummichog Australian herring.\" Shortnose chimaera batfish dhufish beluga sturgeon arrowtooth eel stingfish tubeshoulder bamboo shark eeltail catfish aruana Sacramento blackfish livebearer swampfish. Mooneye marblefish luminous hake hussar prickleback unicorn fish pike conger slimy sculpin. Sevan trout redtooth triggerfish basking shark--Indian mul; lagena, anchovy, hammerhead shark. Sabertooth wormfish white marlin armored gurnard bigeye squaretail, Siamese fighting fish snapper herring smelt dory. Sauger, river stingray, silverside mustard eel vendace gudgeon cepalin, pearleye peacock flounder gulf menhaden, dealfish snubnose eel searobin dogfish ocean sunfish.",
                    "slug": "Derf434808",
                    "createdAt": "2022-05-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Spikefish southern grayling cutthroat trout",
                    "photos": [
                        "https://images.ukrsalon.com.ua/files/1/1558/1369622/original/20120814155054.jpg",
                        'https://img.championat.com/s/735x490/news/big/q/j/massazh-kotoryj-umenshit-vashi-formy-vy-prosto-lezhite-i-hudeete_1564681008234562299.jpg',
                        'https://stamina.center/ru/wp-content/uploads/sites/2/2019/10/Stamina-likuvalnyj-masazh-01.jpg'
                    ],
                    "text": "Jellynose fish snook tiger shovelnose catfish; Pacific saury whitetip reef shark snake mudhead. Rock bass bristlemouth plunderfish yellow tang mudsucker hardhead catfish rough scad. Neon tetra, queen parrotfish lenok Pacific herring combtooth blenny blue eye blackchin duckbill cobbler! Black bass, Oriental loach slender snipe eel Norwegian Atlantic salmon porbeagle shark handfish buri! Flagblenny marlin saber-toothed blenny electric eel yellow perch, flathead smooth dogfish! Flagtail African lungfish trumpeter livebearer pickerel flat loach Australian prowfish.\n" +
                        "<br />" +
                        "Garden eel luderick jewfish ghost carp Kafue pike Rasbora electric knifefish firefish, cod. Frogmouth catfish, baikal oilfish candlefish baikal oilfish sind danio dogfish redtooth triggerfish emperor. Coolie loach lumpsucker trumpeter swordtail tidewater goby South American darter. Whitebait, inconnu North American darter greeneye; tapetail Indian mul. Píntano rock cod electric catfish. Sea devil sturgeon whalefish yellow bass ricefish barreleye Black angelfish squawfish threespine stickleback Cornish Spaktailed Bream. Pollock, cavefish pink salmon Sacramento blackfish king of herring. Goosefish parrotfish Colorado squawfish dealfish man-of-war fish, longfin escolar Celebes rainbowfish ghost flathead soldierfish zebra lionfish dogfish smoothtongue driftfish, pencilsmelt soldierfish porcupinefish wahoo Pacific argentine. Deep sea bonefish pikehead butterflyfish redmouth whalefish oilfish fire bar danio.",
                    "slug": "Derf808",
                    "createdAt": "2022-06-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
                {
                    "_id": "629f26fb379f441955fb448e",
                    "title": "Asian carps pompano longnose whiptail",
                    "photos": [
                        "https://img.championat.com/s/735x490/news/big/d/l/tehnika-tochechnogo-massazha-dlja-pohudenija_15905066501829841550.jpg",
                        'https://novaya.com.ua/wp-content/uploads/2021/09/massazh-spiny-1.jpg'
                    ],
                    "text": "Mahseer; beachsalmon snoek, pufferfish deep sea smelt brook trout jawfish merluccid hake panga. Grunt sculpin slimehead merluccid hake: pejerrey goldeye; tompot blenny banjo catfish crevice kelpfish madtom spiny dogfish round herring, cusk-eel sea dragon. Trout Blacksmelt smalltooth sawfish Redhorse sucker Pacific albacore walleye flat loach? Searobin pollock summer flounder triggerfish redtooth triggerfish northern sea robin: smooth dogfish tadpole fish. Mudsucker; soldierfish river stingray, \"bonytongue dwarf loach?\"\n" +
                        "<br />" +
                        "Threadfin bream. Earthworm eel basking shark basslet barred danio bluntnose knifefish pollock yellowtail clownfish ghost fish yellowmargin triggerfish tadpole cod! Bonytail chub sweeper thornyhead mummichog boga wolf-herring louvar guppy mud cat oceanic flyingfish spiny dogfish, Canthigaster rostrata duckbill eel kahawai wormfish zebra trout. European eel, devil ray tui chub channel bass archerfish handfish clown loach. Anemonefish mail-cheeked fish queen triggerfish needlefish, ponyfish Mexican golden trout, goldfish.\n" +
                        "<br />" +
                        "Mail-cheeked fish, \"yellowtail pike conger halfmoon roughy blue eye deepwater cardinalfish smoothtongue Razorback sucker redmouth whalefish, eulachon.\" Rainbowfish paradise fish sind danio, \"grunter, leaffish inanga, blue triggerfish zebra bullhead shark trumpeter mustard eel murray cod labyrinth fish,\" righteye flounder boafish. Jackfish, \"gombessa airsac catfish Shingle Fish queen danio; louvar pelican gulper mummichog Australian herring.\" Shortnose chimaera batfish dhufish beluga sturgeon arrowtooth eel stingfish tubeshoulder bamboo shark eeltail catfish aruana Sacramento blackfish livebearer swampfish. Mooneye marblefish luminous hake hussar prickleback unicorn fish pike conger slimy sculpin. Sevan trout redtooth triggerfish basking shark--Indian mul; lagena, anchovy, hammerhead shark. Sabertooth wormfish white marlin armored gurnard bigeye squaretail, Siamese fighting fish snapper herring smelt dory. Sauger, river stingray, silverside mustard eel vendace gudgeon cepalin, pearleye peacock flounder gulf menhaden, dealfish snubnose eel searobin dogfish ocean sunfish.",
                    "slug": "Derf434808",
                    "createdAt": "2022-05-07T10:22:51.952Z",
                    "updatedAt": "2022-06-07T10:22:51.952Z"
                },
            ],
            "pageCount": 7
        })
        //fetches data from the server
    }

    render() {
        const {t} = this.context

        return <section>
            <Head>
                <title>{t('records')}{TITLE_POSTFIX}</title>
            </Head>

            <Breadcrumbs items={[
                {
                    name: t('mainPage'),
                    href: '/',
                },
                {
                    name: t('records'),
                    href: '/blog',
                }
            ]}/>
            <div className={'responsive-content'}>
                <p className="caption">{t('gladToSeeYouHere')}</p>
                <h1>{t('welcomeToOurBlog')}</h1>
            </div>
            <div style={{marginTop: 32}} bp={'grid'}>
                <div bp={'12 8@md'}>
                    <div bp={'grid'} style={{marginBottom: 12}}>
                        {!Objects.isEmpty(this.state.articles) && this.state.articles.map((article, index) =>
                            <div bp={'12 6@md'} key={index}>
                                <ArticleCard {...article} />
                            </div>
                        )}
                    </div>
                    {this.state.pageCount > 1 && <Paginator page={this.state.page} onChange={this.handlePageChange}
                                                            pageCnt={this.state.pageCount}/>}
                </div>
                <div bp={'12 4@md'}>
                    <ShareInSocialMedia/>
                </div>
            </div>
        </section>
    }
}

export default withRouter(BlogPage);
