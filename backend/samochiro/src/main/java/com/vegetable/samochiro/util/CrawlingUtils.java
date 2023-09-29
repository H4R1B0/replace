package com.vegetable.samochiro.util;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class CrawlingUtils {
	@Value("${spring.file.negative-crawling}")
	private String location;

	public List<String> getBadWordList() {
		ArrayList<String> list = new ArrayList<>();

		try {
			ClassPathResource resource = new ClassPathResource(location);
			if (!resource.exists()) {
				log.error("Invalid filePath : {}", location);
				throw new IllegalArgumentException();
			}
			BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));

			String line;

			while ((line = br.readLine()) != null) {
				list.add(line);
			}

			br.close();

		} catch (IOException e) {
			// TODO: handle exception
		}
		return list;
	}

	public static int[] computeFailureFunction(String badWord) {
		int m = badWord.length();
		int[] failure = new int[m];
		int j = 0;

		for (int i = 1; i < m; i++) {
			while (j > 0 && badWord.charAt(j) != badWord.charAt(i)) {
				j = failure[j - 1];
			}
			if (badWord.charAt(j) == badWord.charAt(i)) {
				j++;
			}
			failure[i] = j;
		}
		return failure;
	}
	//kmp 알고리즘용 실패 함수 메소드

	public static boolean kmpSearch(String text, String pattern) {
		int[] failure = computeFailureFunction(pattern);
		int i = 0, j = 0;
		int n = text.length();
		int m = pattern.length();

		while (i < n) {
			if (pattern.charAt(j) == text.charAt(i)) {
				if (j == m - 1) {
					//return i - m + 1;  // Pattern found
					return true;
				}
				i++;
				j++;
			} else {
				if (j != 0) {
					j = failure[j - 1];
				} else {
					i++;
				}
			}
		}
		//return -1;  // Pattern not found
		return false;
	}
	//kmp 알고리즘

	public static void main(String[] args) {

		CrawlingUtils crawlingUtils = new CrawlingUtils();
		List<String> badWordList = crawlingUtils.getBadWordList();

		String content = "씨발 진짜 개같네 좆같네 진짜 어이없음";

		for(String s : badWordList) {
			System.out.println(kmpSearch(content, s));
		}

	}

//		try {
//			String rootPath = System.getProperty("user.dir");
//			String filePath = "C:\\Users\\SSAFY\\PycharmProjects\\pythonProject\\crawling\\negative_crawling.txt";
//			BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(filePath), "utf-8"));
//			//BufferedReader br = new BufferedReader(new FileReader("C:\\Users\\SSAFY\\PycharmProjects\\pythonProject\\crawling\\negative_crawling.txt"));
//			//BufferedReader br = new BufferedReader(new InputStreamReader(new ClassPathResource("negative_crawling.txt").getInputStream(),"x-windows-949"));
//			//BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream("C:\\Users\\SSAFY\\PycharmProjects\\pythonProject\\crawling\\negative_crawling.txt"),Charset.forName("UTF-8")));
//			String line;
//
//			while((line = br.readLine()) != null) {
//				list.add(line);
//			}
//			br.close();
//		}
//		catch (IOException e) {
//			e.printStackTrace();
//		}

//		for(String str : list) {
//			System.out.println(str);
//		}

//		System.out.println(Charset.defaultCharset());



}
