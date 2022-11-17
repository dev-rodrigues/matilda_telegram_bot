
export default interface EurekaRepository {
    findServices():Promise<Object[]>
}