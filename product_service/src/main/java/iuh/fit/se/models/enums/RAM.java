package iuh.fit.se.models.enums;

public enum RAM {
    GB_4("4 GB"),
    GB_6("6 GB"),
    GB_8("8 GB"),
    GB_12("12 GB"),
    GB_16("16 GB"),
    GB_32("32 GB"),
    GB_64("64 GB");

    private final String size;

    RAM(String size) {
        this.size = size;
    }

    public String getSize() {
        return size;
    }
}
