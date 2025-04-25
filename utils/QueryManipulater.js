module.exports = class QueryManipulater {
    constructor(req, model) {
        this.req = req;
        this.model = model;
        this.query;
    }
    filter() {
        let reqQueryStr = JSON.stringify(this.req.query);
        if (!reqQueryStr.includes("$"))
            reqQueryStr = reqQueryStr.replace(/(gte|gt|lte|lt|ne)/, match => `$${match}`);

        let filter = JSON.parse(reqQueryStr);
        ["sort", "select", "page", "limit", "skip"].map(val => {
            if (filter[val])
                delete filter[val];
        });

        this.query = this.model.find(filter);
        return this;
    }
    limit() {
        let select;
        if (this.req.query.select)
            select = this.req.query.select.split(",").join(" ");
        else
            select = "-__v";
        this.query = this.query.select(select);
        return this;
    }
    sort() {
        let sort;
        if (this.req.query.sort)
            sort = this.req.query.sort.split(",").join(" ");
        else
            sort = "createdAt";
        this.query = this.query.sort(sort);
        return this;
    }
    paginate() {
        let page = +this.req.query.page || 1;
        let limit = +this.req.query.limit || Infinity;
        let skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}