package iuh.fit.se.models.enums;

public enum  Gender {
    MALE("Male"), 
    FEMALE("Female"), 
    OTHER("Other");

    private final String displayName;

    Gender(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
