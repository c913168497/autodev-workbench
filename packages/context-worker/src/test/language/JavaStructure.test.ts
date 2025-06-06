import { describe, it, expect, beforeEach } from 'vitest';

import { TestLanguageServiceProvider } from "../TestLanguageService";
import { JavaStructurerProvider } from "../../code-context/java/JavaStructurerProvider";
import { CodeFile } from "../../codemodel/CodeElement";

const Parser = require('web-tree-sitter');

describe('JavaStructure', () => {
	it('should convert a simple file to CodeFile', async () => {
		const javaHelloWorld = `package com.example;
import java.util.List;

@Application
@AutoDev("/api/users")
public class ExampleClass {
	public void exampleMethod(String param1, int param2) {
		System.out.println("Hello World");
	}
}`;

		await Parser.init();
		const parser = new Parser();
		const languageService = new TestLanguageServiceProvider(parser);

		const structurer = new JavaStructurerProvider();
		await structurer.init(languageService);

		const codeFile = await structurer.parseFile(javaHelloWorld, '');
		expect(codeFile as CodeFile).toEqual({
			name: '',
			filepath: '',
			language: 'java',
			functions: [],
			path: '',
			package: 'com.example',
			imports: ['java.util.List'],
			classes: [
				{
					type: 'class',
					annotations: [
						{
							name: 'Application',
							keyValues: [],
						},
						{
							name: 'AutoDev',
							keyValues: [
								{
									key: "value",
									value: "/api/users"
								}
							],
						},
					],
					constant: [],
					extends: [],
					fields: [],
					methods: [
						{
							vars: [],
							modifiers: "public",
							name: 'exampleMethod',
							annotations: [],
							start: {
								row: 6,
								column: 1,
							},
							end: {
								row: 8,
								column: 2,
							},
							returnType: 'void',
						},
					],
					name: 'ExampleClass',
					canonicalName: 'com.example.ExampleClass',
					package: 'com.example',
					implements: [],
					start: {
						row: 3,
						column: 0,
					},
					end: {
						row: 9,
						column: 1,
					},
				},
			],
		});
	});

	it('should parse for Lombok', async () => {
		const javaHelloWorld = `
package cc.unitmesh.untitled.demo.dto;

import cc.unitmesh.untitled.demo.entity.User;
import lombok.Data;

@Data
public class CreateBlogRequest {
    private String title;
    private String content;
    private User user;
}
`;

		await Parser.init();
		const parser = new Parser();
		const languageService = new TestLanguageServiceProvider(parser);

		const structurer = new JavaStructurerProvider();
		await structurer.init(languageService);

		const codeFile = await structurer.parseFile(javaHelloWorld, '');
		expect(codeFile as CodeFile).toEqual({
			name: '',
			filepath: '',
			language: 'java',
			functions: [],
			path: '',
			package: 'cc.unitmesh.untitled.demo.dto',
			imports: ['cc.unitmesh.untitled.demo.entity.User', 'lombok.Data'],
			classes: [
				{
					type: 'class',
					// "annotations": Array [
					//         Object {
					//           "keyValues": Array [],
					//           "name": "Data",
					//         },
					//       ],
					annotations: [
						{
							name: 'Data',
							keyValues: [],
						}
					],
					canonicalName: 'cc.unitmesh.untitled.demo.dto.CreateBlogRequest',
					constant: [],
					extends: [],
					methods: [],
					name: 'CreateBlogRequest',
					package: 'cc.unitmesh.untitled.demo.dto',
					implements: [],
					start: { row: 6, column: 0 },
					end: { row: 11, column: 1 },
					fields: [
						{
							name: 'title',
							start: { row: 0, column: 0 },
							end: { row: 0, column: 0 },
							type: 'String',
						},
						{
							name: 'content',
							start: { row: 0, column: 0 },
							end: { row: 0, column: 0 },
							type: 'String',
						},
						{
							name: 'user',
							start: { row: 0, column: 0 },
							end: { row: 0, column: 0 },
							type: 'User',
						},
					],
				},
			],
		});
	});
});
