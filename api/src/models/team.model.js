import Model from "./model.js";

class Team extends Model {
    constructor(id, name, address) {
        super();
        this.id = id;
        this.name = name;
        this.address = address;
    }
}

export default Team;