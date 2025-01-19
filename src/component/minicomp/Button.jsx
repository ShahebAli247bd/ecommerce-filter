import './general.css'

const Button = ({ id, children, handlerBuyNow }) => {
    return (
        <div>
            <button onClick={() => handlerBuyNow(id)}>{children}</button>
        </div>
    );
};

export default Button
