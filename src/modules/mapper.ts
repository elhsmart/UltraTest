export abstract class Mapper<O, I> {
	abstract mapFrom(param: I): O;
	abstract mapTo(param: O): I;
}