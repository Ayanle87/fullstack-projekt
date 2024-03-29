import { useContext, useState } from "react";
import { ProductContext } from "../ProductContext";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";
import BigModal from "./BigModal";
import queryString from "query-string";

const FirstModal: React.FC<{ selectedProductId: number | null }> = ({
    selectedProductId,
}) => {
    const { products, setProducts } = useContext(ProductContext);

    const [isFirstModalOpen, setFirstModalOpen] = useState(true);
    const [isBigModalOpen, setIsBigModalOpen] = useState(false);

    const navigate = useNavigate();

    const handleCloseFirstModal = () => {
        console.log("stäng");

        products.forEach((product) => {
            if (product.id === selectedProductId) {
                product.isOpen = false;
                console.log("Öppnad produkt;", product.id, product.isOpen);
            }
        });

        setProducts([...products]);
    };

    const handleOpenBigModal = () => {
        console.log("Öppnar stor modal");

        const queryParams = queryString.stringify({
            productId: selectedProductId,
        });

        navigate(`/big-modal?${queryParams}`);

        setFirstModalOpen(false);

        setIsBigModalOpen(true);
    };

    return (
        <>
            <div className="firstmodalcontainer">
                <Modal
                    show={isFirstModalOpen}
                    onHide={handleCloseFirstModal}
                    className="firstModalclass"
                >
                    {products.length > 0 &&
                        products.map((product) => {
                            const isSelectedProduct =
                                selectedProductId !== null &&
                                selectedProductId === product.id;

                            return (
                                <StyledContainer key={product.id}>
                                    {isSelectedProduct && (
                                        <Ul>
                                            <Li>
                                                <StyledImgDiv>
                                                    <img
                                                        src="/ux ikoner/Pins/close-modal.png"
                                                        alt="Kryss för att stänga annonsen"
                                                        className="closeStyleFirstModal"
                                                        style={closeStyle}
                                                        onClick={
                                                            handleCloseFirstModal
                                                        }
                                                    />

                                                    <img
                                                        alt="product"
                                                        src={
                                                            "http://localhost:8080" +
                                                            product.image
                                                        }
                                                        style={imgStyle}
                                                        className="imgStyle"
                                                    />
                                                </StyledImgDiv>
                                                <StyledTopContainer>
                                                    <StyledH1>
                                                        {product.name}
                                                    </StyledH1>

                                                    <StyledPriceDistanceContainer>
                                                        <StyledPrice>
                                                            {product.price} kr
                                                        </StyledPrice>

                                                        {/* <StyledDistance>
                                                            Avstånd
                                                        </StyledDistance> */}
                                                    </StyledPriceDistanceContainer>
                                                </StyledTopContainer>

                                                <div>
                                                    <img
                                                        src="/ux ikoner/arrow.png"
                                                        alt="Pil för att öppna annonsen"
                                                        className="arrowStyle"
                                                        onClick={
                                                            handleOpenBigModal
                                                        }
                                                    />
                                                </div>
                                            </Li>
                                        </Ul>
                                    )}
                                </StyledContainer>
                            );
                        })}
                </Modal>
            </div>

            {isBigModalOpen && (
                <BigModal selectedProductId={selectedProductId} />
            )}
        </>
    );
};

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
    justify-content: center;

    width: 200px;
`;

const StyledImgDiv = styled.div`
    width: 100%;
    // width: 340px;
    border-radius: 8.33684px;
    object-fit: contain;
    height: 224px;
    position: relative;
    background: #495057;
    object-fit: contain;
    top: 0px;

    z-index: 0;
`;

const StyledTopContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;
const StyledPriceDistanceContainer = styled.div`
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 15px;
    margin-right: 15px;
`;
const StyledH1 = styled.h1`
    font-family: "Open Sans", bold, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 0.25px;
    margin-left: 15px;
    margin-bottom; 15px;
    margin-top: 15px;
    color: #000000;
`;

const StyledPrice = styled.p`
    font-family: "Open Sans", bold, sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 22px;
    letter-spacing: 0.25px;
`;

const StyledDistance = styled.p`
    font-family: "Open Sans", sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    letter-spacing: 0.135894px;
    color: red;
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

export default FirstModal;
