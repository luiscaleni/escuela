import Block from "../components/Block";
import Container from "../components/Container";
import ContainerMax from "../components/ContainerMax";
import Publication from "../components/Publication";

function Formation() {
    return ( <>
            <Publication title="Formación" nameAsset='banner_formation.jpg' typeElm='img' description="Información sobre la formación de árbitros y cursos disponibles.">
                <ContainerMax imgSrc="/images/formation.jpg" altText="Formación de árbitros" titleText="Formación de Árbitros" text="La sección Formación tendrá una presentación general y cinco áreas de especialización. Arbitraje de deportes colectivos: Fútbol, futsal, fútbol playa, básquet, vóley, handball, hockey, rugby, waterpolo y otras disciplinas. Reglas de juego, posicionamiento, señales, conducción de partidos y trabajo en equipo arbitral." />
            </Publication>
    </> );
}

export default Formation;