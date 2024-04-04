import { UserRepositoryImpl } from '../../../Data/repositories/UserRepository';

const { updatePermissionsStatus } = new UserRepositoryImpl();

export const UpdatePermissionsStatusUseCase = async (id: string) => {

   return await updatePermissionsStatus(id);


}