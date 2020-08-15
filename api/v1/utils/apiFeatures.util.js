class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    this.query = this.query.find(queryObj);
    return this;
  }

  sort(defaultSortBy) {
    if (this.queryString.query.sort) {
      this.query = this.query.sort(this.queryString.query.sort);
    } else {
      this.query = this.query.sort(defaultSortBy);
    }

    return this;
  }

  paginate() {
    const page = this.queryString.query.page * 1 || 1;
    const limit = this.queryString.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeatures;
