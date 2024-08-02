import {
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
    IsEnum,
    IsArray,
    ValidateNested,
    Matches,
    IsJSON,
    IsUrl,
    IsISO8601,
} from 'class-validator';
import {Type} from 'class-transformer';
import {PostType} from '../enums/postType.enum';
import {PostStatus} from '../enums/postStatus.enum';
import {CreatePostMetaOptionsDto} from './create-meta-options.dto';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        example: 'This is a title',
        description: 'This is the title for the blog post',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(1024)
    title: string;

    @ApiProperty({
        enum: PostType,
        description: "Possible values, 'post','page','story','series'",
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @ApiProperty({
        description: "For Example - 'my-url'",
        example: 'or-hasson-post',
    })
    @IsString()
    @IsNotEmpty()
    @MaxLength(512)
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message:
            'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
    })
    slug: string;

    @ApiProperty({
        enum: PostStatus,
        description: "Possible values 'draft','scheduled','review','published'",
    })
    @IsEnum(PostStatus)
    @IsNotEmpty()
    status: PostStatus;

    @ApiPropertyOptional({
        description: 'This is the content of the post',
        example: "The post's content",
    })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiPropertyOptional({
        description:
            'Serialize your JSON object else a validation error will be thrown',
        example: '{"author":"John Doe","categories":["Tech","News"]}',
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'Featured image for your blog post',
        example: 'http://example.com/image.jpg',
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'The date on which the blog post is published',
        example: '2024-08-01T00:00:00Z',
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'Array of tags passed as string values',
        example: ['Java', 'TypeScript', 'C++'],
    })
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @MinLength(3, {each: true})
    tags?: string[];

    @ApiPropertyOptional({
        type: 'array',
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description:
                        'The key can be any string identifier for your meta option',
                    example: 'sidebarEnabled',
                },
                value: {
                    type: 'any',
                    description: 'Any value that your want to save to the key',
                    example: true,
                },
            },
        },
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto[];
}
