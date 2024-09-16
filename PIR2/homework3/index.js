// комментариями то, как было в примере с лекции, до переделывания на генераторы

const getLazy = (obj) => {
    const iterator = typeof obj.next === 'function' && obj.next.constructor.name === 'AsyncFunction'
    ? obj
    // : obj[Symbol.iterator]()
    :{
        [Symbol.asyncIterator]: async function* () {
            let index = 0;
            for await (let val of obj) {
                yield { val, index };
                index++;
            }
        }
    };

    return new Proxy(
        iterator,
        {
            get(_, prop) {
                switch (prop) {
                    case 'map':
                        return predicat => {
                            // return getLazy({
                            //     [Symbol.iterator]() {return this},
                            //     index : 0,
                            //     next() {
                            //         const { value, done } = iterator.next()
                            //         if (done) {
                            //             return { done }
                            //         } else {
                            //             return { done, value: predicat(value, this.index++)}
                            //         }
                            //     }
                            // })
                            return getLazy({
                                [Symbol.asyncIterator] : async function* () {
                                    for await (let {val} of iterator) {
                                        yield predicat(val);
                                    }
                                }
                            })
                        }
                        break
                    case 'take':
                        // return (count) => {
                        //     return getLazy({
                        //         [Symbol.iterator]() {return this},
                        //         next() {
                        //             return count-- ? iterator.next() : { done:true }
                        //         }
                        //     })
                        // }
                        return count => getLazy({
                            [Symbol.asyncIterator]: async function* () {
                                for await (let { val, index } of iterator) {
                                    if (index >= count) break;
                                    yield val;
                                }
                            }
                        });
                        break
                    case 'filter':
                        return ll => getLazy({
                            [Symbol.asyncIterator]:async function* () {
                                for await (let { val, index } of iterator) {
                                    if (ll(val)) yield val;
                                }
                            }
                        });
                        break
                    default:
                        return Reflect.get(...arguments)
                }   
            }
        }
    )
}

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const lazyIterator = getLazy(list)
.map(async (x) => {await delay(4000);return x + 10})
.map(x => {return x + 1})
.filter(x => x % 2 == 0)
.take(3);


// .map((x, i) => {if (i === 3) {throw 'error!!!!'} else return x})
// console.log(...lazyIterator)


(async () => {
    for await (let {val} of lazyIterator) console.log(val)
})()