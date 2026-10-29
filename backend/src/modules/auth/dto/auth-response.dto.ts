import { ApiProperty } from '@nestjs/swagger';

export class UserProfileDto {
  @ApiProperty({ example: 'a0b1c2d3-e4f5-6789-abcd-ef0123456789' })
  id!: string;

  @ApiProperty({ example: 'owner@baperfnb.com' })
  email!: string;

  @ApiProperty({ example: 'Budi Pratama' })
  name!: string;

  @ApiProperty({ example: 'owner' })
  role!: string;

  @ApiProperty({ example: true })
  isActive!: boolean;

  @ApiProperty({ example: '2026-10-29T18:00:00.000Z' })
  createdAt!: Date;
}

export class AuthResponseDataDto {
  @ApiProperty({ type: UserProfileDto })
  user!: UserProfileDto;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT Bearer Access Token',
  })
  accessToken!: string;
}

export class ServiceResponseSchemaDto<T> {
  @ApiProperty({ example: 200 })
  statusCode!: number;

  @ApiProperty({ example: 'success' })
  status!: string;

  @ApiProperty({ example: 'Operasi berhasil' })
  message!: string;

  data!: T;
}
