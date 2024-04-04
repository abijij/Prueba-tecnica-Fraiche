import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository';
import { User } from '../../entities/User';

const { updateVerifyStatus } = new UserRepositoryImpl();

export const UpdateVerifyStatusUseCase = async (id: string) => {

   return await updateVerifyStatus(id);


}