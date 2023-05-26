import { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import styled from "styled-components";

// Interface som specificerar vad som ska finnas i product
interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
}
// Kategori-ikonerna. Rubrikerna (Elektronik etc) matchar databasen och därför fattar koden vilken bild som tillhör vilken produkt
const categoryImages: { [key: string]: string } = {
    Elektronik: "/ux ikoner/Pins/ElektronikMainD.png",
    Fordon: "/ux ikoner/Pins/FordonMainD.png",
    Fritid: "/ux ikoner/pins/FritidMain@0.png",
    Hushåll: "/ux ikoner/pins/HusMain@0.png",
    Kläder: "/ux ikoner/pins/KladerMain@0.png",
    Övrigt: "/ux ikoner/pins/OvrigtMain@0.png",
};

// Huvudfunktionen
const ObjectCard: React.FC = () => {
    // Här sparas det som fecthas från backend
    const [result, setResult] = useState<Product[]>([]);

    // Sparar ID:t på vald produkt. Det gör att rätt produkt visas när den är vald
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );

    //För att kunna öppna och stänga modalen
    const [isModalOpen, setModalOpen] = useState(false);

    // Det som skrivs in i sökfältet
    const [searchValue, setSearchValue] = useState("");

    // Hämtar datan från backendet
    useEffect(() => {
        Modal.setAppElement("#root");

        axios
            .get("http://localhost:8080/")
            .then((response) => {
                setResult(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    // Söker igenom det som fetchats och och letar upp det matchde id:numret.
    const selectedProduct = selectedProductId
        ? result.find((product) => product.id === selectedProductId)
        : null;

    // Funktion som sätter selectedProductIds useState till det ID som klickats på och öppnar modalen.
    const handleClick = (id: number) => {
        setSelectedProductId(id);
        handleOpenModal();
    };

    // Öppnar modalen när man klickar på en pin
    const handleOpenModal = () => {
        setModalOpen(true);
    };

    // Stänger modalen när man klickar på en pin
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <div>
                {/* Sökfält. searchValue är det som skrivs in.  */}
                <form>
                    <input
                        type="text"
                        value={searchValue}
                        onChange={(event) => setSearchValue(event.target.value)}
                    />
                </form>
            </div>

            {result.length > 0 &&
                result

                    // Filtrerar det som skrivs i sökfältet (searchValue) och jämnför med productkategorierna och produktnamnen. Funkar att söka med både liten och stor bokstav pga toLowerCase.
                    .filter(
                        (product) =>
                            product.category
                                .toLowerCase()
                                .includes(searchValue.toLowerCase()) ||
                            product.name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                    )

                    //skapar en array av img baserat på resultatet från fetchen. I src sätter kategorin rätt kategori-bild uifrån produkt katergorin. (Se categoryImages längst upp). HandleClick skickar med produkt id:t som argument för att rätt produkt ska visas.
                    .map((product) => (
                        <img
                            className="styledPins"
                            key={product.id}
                            src={categoryImages[product.category]}
                            alt={product.name}
                            onClick={() => handleClick(product.id)}
                        />
                    ))}
            {/* Modalen som öppnas 'onClick' på pinsen. Modalen innehåller namn, bild, pris, produktbeskrivning. */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                className="modalclass"
                style={{
                    overlay: {
                        zIndex: 9999,
                    },
                }}
            >
                {selectedProduct && (
                    <StyledContainer>
                        <Ul>
                            <Li key={selectedProduct.id}>
                                <StyledImgDiv>
                                    <img
                                        src="/ux ikoner/Pins/close-modal.png"
                                        alt=""
                                        className="closeStyle"
                                        style={closeStyle}
                                        onClick={handleCloseModal}
                                    />

                                    <img
                                        alt="product"
                                        src={
                                            "http://localhost:8080" +
                                            selectedProduct.image
                                        }
                                        style={imgStyle}
                                        className="imgStyle"
                                    />
                                </StyledImgDiv>

                                <StyledTopContainer>
                                    <StyledH1>{selectedProduct.name}</StyledH1>

                                    <StyledPriceDistanceContainer>
                                        <StyledPrice>
                                            {selectedProduct.price}kr
                                        </StyledPrice>
                                        <StyledDistance>
                                            500m bort
                                        </StyledDistance>
                                    </StyledPriceDistanceContainer>
                                </StyledTopContainer>

                                <StyledDescriptionDiv>
                                    <StyledDescription>
                                        {selectedProduct.description}
                                    </StyledDescription>
                                </StyledDescriptionDiv>
                            </Li>
                        </Ul>
                    </StyledContainer>
                )}
            </Modal>
        </>
    );
};

// CSS

const closeStyle = {
    width: "17.74px",
    height: "17.74px",
    top: "5px",
    right: "10px",
    zIndex: "1",
};

const imgStyle = {
    width: "100%",
    height: "100%",
    right: "0",
    zIndex: "0",
};

const StyledContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledImgDiv = styled.div`
    width: 100%;
    // width: 374px;

    height: 309.84px;
    position: relative;
    background: #495057;
    object-fit: contain;

    z-index: 0;
`;

const StyledTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledH1 = styled.h1`
   
    font-family: "Open Sans", bold, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.25px;
    margin-left: 15px;
    margin-bottom; 15px;
    margin-top: 15px;

    color: #000000;
`;

const StyledPriceDistanceContainer = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
    margin-right: 15px;
`;

const StyledPrice = styled.p`
    font-family: "Open Sans", bold, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.25px;

    // display: flex;
    // align-items: center;
    // text-align: right;
`;
const StyledDistance = styled.p`
    font-family: "Open Sans", sans-serif;

    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 12px;

    letter-spacing: 0.135894px;

    color: #000000;
`;

const StyledDescription = styled.p`
    position: relative;

    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 19px;
    letter-spacing: 0.25px;

    //     display: flex;
    // align-items: center;
`;

const StyledDescriptionDiv = styled.div`
    box-sizing: border-box;
    display: flex;
    // object-fit: contain;
    width: 322.15px;
    height: 265.18px;
    padding: 10px;
    // align-items: center;
    margin-left: 15px;
    margin-top: 10px;

    border: 0.543575px solid #c0d0b9;
    border-radius: 2.71787px;
`;

const Ul = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 75.62px;
    isolation: isolate;

    width: 100%;
    height: 733.38px;
    left: 13px;
    top: 50.57px;
`;

const Li = styled.li`
    list-style: none;
`;

export default ObjectCard;
