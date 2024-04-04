import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";
import { User } from "../../entities/User";

const { removeProduct } = new UserLocalRepositoryImpl();
export const RemoveProductLocalUseCase = async () => {
    return await removeProduct();
}