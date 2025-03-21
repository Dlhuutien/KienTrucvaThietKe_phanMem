package iuh.fit.se.models.enums;

public enum ConnectionType {
	USB("USB Connection"), 
    WIRELESS("Wireless Connection"), 
    BLUETOOTH("Bluetooth Connection");

    private final String displayName;

    ConnectionType(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
