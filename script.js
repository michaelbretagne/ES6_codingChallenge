// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a
build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions,
destructuring, etc.

*/

// Parks and Street Property + age methode
class elements {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    // Age method
    calculateAge() {
        let now = new Date().getFullYear();
        let age = now - this.buildYear;
        return age;
    }
}

// Parks property
class parks extends elements {
    constructor(name, buildYear, numOfTrees, sqKm) {
        super(name, buildYear);
        this.numOfTrees = numOfTrees;
        this.sqKm = sqKm;
    }
    // Tree density of each park
    treeDensity() {
        let density = (this.numOfTrees) / (this.sqKm);
        return(density.toFixed(2));
    }
}

// Streets property
class streets extends elements {
    constructor(name, buildYear, size='Normal', kmLength) {
        super(name, buildYear);
        this.size = size;
        this.kmLength = kmLength;
    }
}


// Park in db
const allParks = [new parks('Lafayette Pk', 1980, 120, 1.8),
                  new parks('Washington Pk', 1976, 90, 2.6),
                  new parks('Hughtington Pk', 1993, 80, 1.3)];

numOfParks = allParks.length;


//Average age of each town's park (forumla: sum of all ages/number of parks)
let ageArrayPark = allParks.map(el => el.calculateAge());

let sumAgePark = (ageArrayPark.reduce((a, b) => a + b, 0)) /
                 (ageArrayPark.length);

console.log(`Our ${numOfParks} parks have an average of ${sumAgePark} ` +
            `years old.`);


// Tree density of each park in the town (forumla: number of trees/park area)
var density = function() {
    for (i=0; i < allParks.length; i++) {
        console.log(`${allParks.map(el => el.name)[i]} has a tree density` +
        ` of ${allParks.map(el => el.treeDensity())[i]} per Km/Square.`);
    }
};

density();

// Parks where there is more than 100 trees
var hundredTrees = function() {
    for (i=0; i < allParks.length; i++) {
        if (allParks.map(el => el.numOfTrees)[i] > 100) {
            console.log(`${allParks.map(el => el.name)[i]} has more than ` +
                `100 trees.`);
        }
    }
};

hundredTrees();


// Streets in db
const allStreets = [new streets('Pine St', 1930, 'Big', 14),
                    new streets('Bush St', 1929, 'Medium', 6),
                    new streets('California St', 1920, 'Huge', 22),
                    new streets('Sutter St', 1925, '', 3)];

numOfStreets = allStreets.length;

// Total and average length of the town's streets
let kmArray = allStreets.map(el => el.kmLength);
let sumKm = kmArray.reduce((a, b) => a + b, 0);

let avgLength = sumKm / numOfStreets;

console.log(`Our ${numOfStreets} streets have a total length of ${sumKm} ` +
    `km, with an average of ${avgLength} km.`);


// Size classification of all streets: tiny/small/normal/big/huge.
// If the size is unknown, the default is normal
for (i = 0; i < allStreets.length; i++) {
    console.log(`${allStreets[i].name}, built in ${allStreets[i].buildYear} ` +
        `is a ${allStreets[i].size}.`);
}


/* -------- Here is the solution from the instructor -----------

class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}


class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; //km2
        this.numTrees = numTrees;
    }

    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    classifyStreet () {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}


const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function calc(arr) {

    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);

    return [sum, sum / arr.length];

}


function reportParks(p) {

    console.log('-----PARKS REPORT-----');

    // Density
    p.forEach(el => el.treeDensity());

    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);

    // Which park has more than 1000 trees
    const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);

}


function reportStreets(s) {

    console.log('-----STREETS REPORT-----');

    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);

    // CLassify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);
*/
