import Address from '../value-object/address';

export default class Customer {
    private _id: string;
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate()
    }
    
    public get name() : string {
        return this._name
    }

    public get id() : string {
        return this._id
    }
    
    public get rewardPoints() : number {
        return this._rewardPoints
    }

    isActive() {
        return this._active
    }  

    validate() {
        if(this._id.length === 0) {
            throw new Error("Id is required");            
        }
        if(this._name.length === 0) {
            throw new Error("Name is required");            
        }
    }

    changeName(name: string) {
        this.validate()
        this._name = name        
    }

    changeAddress(address: Address) {
        this._address = address
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate costumer");            
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }

    
    public get adrress() : Address {
        return this._address
    }
    
}