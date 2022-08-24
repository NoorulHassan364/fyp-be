class ApiFeatuers {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ["limit", "sort", "page", "fields"];
    excludedFields.forEach((elem) => delete queryObj[elem]);
    this.query = this.query.find(queryObj);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      this.query = this.query.sort(this.queryString.sort);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  selectingFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }
    return this;
  }
  limitingDocuments() {
    const limit = this.queryString.limit * 1 || 100;
    this.query = this.query.limit(limit);
    return this;
  }
}
module.exports = ApiFeatuers;
