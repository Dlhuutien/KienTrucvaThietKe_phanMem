import React from 'react';

const PaymentCancel = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Thanh toán đã bị hủy</h1>
            <p>Bạn đã hủy thanh toán. Vui lòng thử lại nếu muốn tiếp tục.</p>
            <a href="/cart">Quay lại giỏ hàng</a>
        </div>
    );
};

export default PaymentCancel;