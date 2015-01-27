var DateTime = function(y, m, d, h, minutes, s, ms, tz){
    BaseObject.call(this);
    if (y == undefined){
        var d = new Date();
    } else if (m == undefined){
        if (y instanceof Date){

        } else if (y instanceof DateTime){

        } else if (typeof y === "string"){

        } else if (typeof y === "number") {

        }
    } else if (d != undefined){
        this.year(y);
        this.month(m);
        this.day(d);
        this.hour(h);
        this.minutes(minutes);
        this.seconds(s);
        this.ms(ms);
        this.tz(tz);
    }
};

Util.extend(DateTime, BaseObject);
DateTime.prototype.year = DateTime.addProperty("year", 0);
DateTime.prototype.month = DateTime.addProperty("month", 0);
DateTime.prototype.day = DateTime.addProperty("day", 0);
DateTime.prototype.hour = DateTime.addProperty("hour", 0);
DateTime.prototype.minutes = DateTime.addProperty("minutes", 0);
DateTime.prototype.seconds = DateTime.addProperty("seconds", 0);
DateTime.prototype.ms = DateTime.addProperty("ms", 0);

/**
 *
 * @return {Date} current date
 */
DateTime.prototype.toDate = function(){
    return new Date(this._v.year,
        this._v.month,
        this._v.day,
        this._v.hour,
        this._v.minutes,
        this._v.seconds,
        this._v.ms
    );
};

/**
 * @return {number} microtime
 */
DateTime.prototype.getMicroTime = function(){
    return this.toDate().getTime();
};