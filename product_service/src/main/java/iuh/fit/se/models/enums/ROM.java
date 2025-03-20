package iuh.fit.se.models.enums;

public enum ROM {
	GB_16("16 GB"),
    GB_32("32 GB"),
    GB_64("64 GB"),
    GB_128("128 GB"),
    GB_256("256 GB"),
    GB_512("512 GB"),
    TB_1("1 TB"),    
    TB_2("2 TB"),     
    TB_4("4 TB");      

    private final String capacity;

    ROM(String capacity) {
        this.capacity = capacity;
    }

    public String getCapacity() {
        return capacity;
    }

}
