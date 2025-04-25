package iuh.fit.se.models.enums;

public enum PaymentMethod {
    STRIPE("stripe"),
    PAYPAL("paypal");

    private String value;

    PaymentMethod(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
