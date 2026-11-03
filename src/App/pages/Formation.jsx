import Block from "../components/Block";
import Container from "../components/Container";
import Publication from "../components/Publication";

function Formation() {
    return ( <>
            <Publication title="Formación" nameAsset='banner_formation.jpg' typeElm='img' description="Información sobre la formación de árbitros y cursos disponibles.">
                <Container>
                    <Block>
                        <h1>Formación</h1>
                        <p>La sección Formación tendrá una presentación general y cinco áreas de especialización. Arbitraje de deportes colectivos: Fútbol, futsal, fútbol playa, básquet, vóley, handball, hockey, rugby, waterpolo y otras disciplinas. Reglas de juego, posicionamiento, señales, conducción de partidos y trabajo en equipo arbitral.</p>
                    </Block>
                    <Block>
                        <img src="/images/formation.jpg" alt="Formación de árbitros" />
                    </Block>
            </Container>
            </Publication>
    </> );
}

export default Formation;