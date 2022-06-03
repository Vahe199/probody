import React from "react"
import {withRouter} from "next/router.js"
import {GlobalContext} from "../contexts/Global.js"
import TextInput from "../components/kit/Form/TextInput";
import TextArea from "../components/kit/Form/TextArea";

class Home extends React.Component {
  render() {
    const {router} = this.props,
        {t} = this.context

    return (
        <div>
            <p className="subtitle additional-text">Привет 👋</p>
            <h1>Мы подобрали массажные салоны в Алматы</h1>
            <br/>
            <div style={{maxWidth: 330}}>
                <TextArea label={'Метка'} max={100} placeholder={'Text'} />
                <br/>
                <TextInput label={'Метка'} placeholder={'Text'} value={'Какой-то текст'} lock={true} />
            </div>

          <p>Cornish Spaktailed Bream: deepwater cardinalfish grass carp emperor angelfish sharksucker, convict cichlid sardine Indian mul driftfish shortnose sucker glass catfish slickhead jewel tetra tang? Deep sea eel guppy barramundi grayling cusk-eel Antarctic cod.</p>
            <br/><br/>
            <p>Convict blenny burrowing goby ladyfish smalltooth sawfish. Shortnose greeneye greeneye Blenny peacock flounder? Pacific salmon driftwood catfish American sole; Sundaland noodlefish whiting sand diver hake; cownose ray char. Pearl danio boga, bonefish alligatorfish basking shark redtooth triggerfish emperor angelfish dartfish beardfish butterfly ray pejerrey ghost fish noodlefish sea dragon quillback. Píntano sauger, paradise fish archerfish: fusilier fish; tadpole fish telescopefish!</p>
            <br/><br/>
              <p>Knifefish amur pike wolffish prickleback; Oregon chub steelhead walking catfish, Sacramento blackfish, northern anchovy kelp perch herring bullhead walleye ground shark batfish. Climbing gourami basking shark tilefish slickhead; snubnose eel; giant sea bass sand eel Ratfish loach catfish.</p>
            <br/><br/>
            <p>Bamboo shark lightfish, bleak sergeant major lionfish stickleback Ragfish Bombay duck harelip sucker, convict cichlid; northern Stargazer telescopefish shad armored searobin; stonefish scorpionfish New Zealand sand diver northern anchovy. Popeye catafula Japanese eel aruana Sundaland noodlefish stingray northern pearleye Atlantic cod plownose chimaera flyingfish. Snake mackerel mustard eel, lighthousefish noodlefish yellow-eye mullet grideye pompano dolphinfish pomfret mako shark surgeonfish. Sand tiger pineconefish torrent catfish Antarctic icefish. Australian prowfish ballan wrasse snake mackerel trumpeter broadband dogfish cookie-cutter shark bonefish smoothtongue thornyhead thorny catfish. Blind shark Owens pupfish, "spiny-back dhufish pigfish; dace, Bitterling lake trout, hardhead catfish."</p>
            <br/><br/>
                  <p>Threadtail megamouth shark blue catfish Owens pupfish filefish eagle ray walleye sabertooth; telescopefish oceanic flyingfish archerfish Billfish; North American freshwater catfish. Reedfish ballan wrasse giant gourami flier triplefin blenny white croaker airbreathing catfish monkfish; snubnose parasitic eel airbreathing catfish snipe eel pollock. Lionfish yellow moray; Blenny wolffish knifefish mudsucker, bramble shark leopard danio whalefish snoek rough sculpin.</p>
            <br/><br/>
        </div>
    );
  }
}
Home.contextType = GlobalContext

export default withRouter(Home);
