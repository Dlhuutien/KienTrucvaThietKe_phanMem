package iuh.fit.se.models.enums;

public enum State {
	PENDING("Pending"), 
	COMPLETED("Completed"), 
	CANCELED("Canceled");

	private final String displayName;

	State(String displayName) {
		this.displayName = displayName;
	}

	public String getDisplayName() {
		return displayName;
	}

}
