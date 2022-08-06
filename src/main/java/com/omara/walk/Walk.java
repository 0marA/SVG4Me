package com.omara.walk;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

public class Walk {

    public static void main(String[] args) throws IOException {
        Path path = Paths.get("src/main/java/com/omara/walk/SVGs");
        List<Path> paths = listFiles(path);
        for (Path p : paths) {
            if (p.toString().endsWith(".zip")) {
                System.out.println(p + " is a zip file");
                String pathString = p.toString();
                String folderToUnzipTo = pathString.substring(0, pathString.length() - 4); // Create folder to unzip to
                new File(folderToUnzipTo).mkdirs();
                unzip(pathString, folderToUnzipTo);

                List<Path> unzippedFolderContents = listFiles(Paths.get(folderToUnzipTo));
                for (Path x : unzippedFolderContents) {
                    if (x.toString().endsWith(".svg")) {
                        System.out.println(x + " is a svg file");
                    }
                }
            }
        }

    }

    // List all files in this path
    public static List<Path> listFiles(Path path) throws IOException {
        List<Path> result;
        try (Stream<Path> walk = Files.walk(path)) {
            result = walk.filter(Files::isRegularFile)
                    .collect(Collectors.toList());
        }
        return result;
    }

    private static void unzip(String zipFilePath, String destDir) {
        File dir = new File(destDir);

        if (!dir.exists()) {
            System.out.println("No Dir to unzip");
        }

        FileInputStream fis;
        byte[] buffer = new byte[1024]; // buffer for read and write data to file
        try {
            fis = new FileInputStream(zipFilePath);
            ZipInputStream zis = new ZipInputStream(fis);
            ZipEntry ze = zis.getNextEntry();
            while (ze != null) {
                String fileName = ze.getName();
                File newFile = new File(destDir + File.separator + fileName);
                System.out.println("Unzipping to " + newFile.getAbsolutePath());
                // create directories for sub directories in zip
                new File(newFile.getParent()).mkdirs();
                FileOutputStream fos = new FileOutputStream(newFile);
                int len;
                while ((len = zis.read(buffer)) > 0) {
                    fos.write(buffer, 0, len);
                }
                fos.close();
                // close this ZipEntry
                zis.closeEntry();
                ze = zis.getNextEntry();
            }
            // close last ZipEntry
            zis.closeEntry();
            zis.close();
            fis.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
