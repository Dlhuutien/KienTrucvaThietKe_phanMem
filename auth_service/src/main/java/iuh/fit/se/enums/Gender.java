package iuh.fit.se.enums;

public enum Gender {
    MALE("Male"), 
    FEMALE("Female"), 
    OTHER("Other");

    private final String displayName;

    Gender(String displayName) {
        this.displayName = displayName;
    }

}
